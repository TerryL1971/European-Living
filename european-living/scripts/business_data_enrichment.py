import pandas as pd
import os
from pathlib import Path
from typing import Dict, List
import json

# ============================================================================
# CONFIGURATION - Works in VS Code with your React project
# ============================================================================

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / 'data'
OUTPUT_DIR = DATA_DIR / 'output'

# Create output directory if it doesn't exist
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# File paths
INPUT_CSV = DATA_DIR / 'businesses_rows.csv'
OUTPUT_CSV = OUTPUT_DIR / 'businesses_rows_updated.csv'
SEARCH_LIST = OUTPUT_DIR / 'businesses_to_search.txt'
TEMPLATE_CSV = OUTPUT_DIR / 'business_updates_template.csv'
STATS_JSON = OUTPUT_DIR / 'data_quality_stats.json'

print("🚀 Business Data Enrichment Tool")
print("=" * 80)
print(f"📂 Input CSV: {INPUT_CSV}")
print(f"💾 Output Directory: {OUTPUT_DIR}")
print("=" * 80 + "\n")

# ============================================================================
# KNOWN CORRECTIONS (from web searches)
# ============================================================================

KNOWN_CORRECTIONS = {
    '0b0b0b0b-0c0c-4d0d-0e0e-0f0f0f0f0f0f': {  # NKD Ramstein
        'address': 'Bahnhofstr. 3a, 66877 Ramstein-Miesenbach',
        'website': 'https://www.nkd.com/',
        'phone': '+49 6371 465577'
    },
    '0b1c2d3e-4f5a-4b6c-7d8e-9f0a1b2c3d4e': {  # Hans im Glück
        'address': 'Fruchthallstraße 7-9, 67655 Kaiserslautern',
        'website': 'https://hansimglueck-burgergrill.de/',
        'phone': '+49 631 62799007'
    },
    '0c878ec6-5838-41e1-8d1e-2adbd4c5db50': {  # GTÜ Schönaich
        'address': 'Mercedesstraße 22, 71101 Schönaich',
        'website': 'https://www.ibk-stuttgart.de'
    }
}

# ============================================================================
# MAIN CLASS
# ============================================================================

class BusinessDataEnricher:
    def __init__(self, csv_path: Path):
        """Initialize with CSV file path"""
        if not csv_path.exists():
            raise FileNotFoundError(f"❌ CSV file not found: {csv_path}")
        
        print(f"📖 Reading CSV file...")
        self.df = pd.read_csv(csv_path)
        self.df = self.df.replace('', pd.NA)
        print(f"✅ Loaded {len(self.df)} businesses\n")
        
    def apply_known_corrections(self):
        """Apply the corrections we already found"""
        print("🔧 Applying known corrections...")
        corrections_applied = 0
        
        for business_id, corrections in KNOWN_CORRECTIONS.items():
            idx = self.df[self.df['id'] == business_id].index
            if len(idx) > 0:
                idx = idx[0]
                business_name = self.df.at[idx, 'name']
                
                for field, value in corrections.items():
                    self.df.at[idx, field] = value
                
                print(f"  ✓ Updated: {business_name}")
                corrections_applied += 1
        
        print(f"✅ Applied {corrections_applied} corrections\n")
        return corrections_applied
    
    def identify_missing_data(self) -> pd.DataFrame:
        """Find businesses missing critical information"""
        missing_mask = (
            self.df['address'].isna() | 
            self.df['website'].isna() | 
            self.df['phone'].isna()
        )
        
        missing_df = self.df[missing_mask].copy()
        
        # Add columns to show what's missing
        missing_df['missing_fields'] = missing_df.apply(
            lambda row: ', '.join([
                field for field in ['address', 'website', 'phone']
                if pd.isna(row[field]) or row[field] == ''
            ]), axis=1
        )
        
        return missing_df[['id', 'name', 'category', 'location', 'missing_fields', 'status']]
    
    def create_search_query(self, row: pd.Series) -> str:
        """Generate an optimized search query"""
        name = row['name']
        location = row['location']
        
        # Clean location
        location_clean = location.split(',')[0] if ',' in location else location
        
        return f"{name} {location_clean}"
    
    def generate_search_list(self, limit: int = 50):
        """Create formatted search list for manual lookups"""
        print(f"📝 Generating search list (top {limit} businesses)...")
        
        missing_df = self.identify_missing_data()
        
        # Filter out placeholder entries
        real_businesses = missing_df[
            ~missing_df['name'].str.contains('Need|Needed|Seeking|English-Speaking', case=False, na=False)
        ]
        
        # Prioritize by category
        priority_categories = ['healthcare', 'automotive', 'restaurants', 'education']
        real_businesses['priority'] = real_businesses['category'].apply(
            lambda x: 0 if x in priority_categories else 1
        )
        real_businesses = real_businesses.sort_values('priority')
        
        # Generate text file
        output = "=" * 80 + "\n"
        output += "BUSINESSES NEEDING DATA - MANUAL SEARCH LIST\n"
        output += f"Generated: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M')}\n"
        output += "=" * 80 + "\n\n"
        output += "INSTRUCTIONS:\n"
        output += "1. Copy the 'Search Query' into Google\n"
        output += "2. Find official website and contact info\n"
        output += "3. Fill data into business_updates_template.csv\n"
        output += "4. Run this script again to apply updates\n\n"
        output += "=" * 80 + "\n\n"
        
        for idx, row in real_businesses.head(limit).iterrows():
            original_row = self.df.loc[idx]
            output += f"ID: {row['id']}\n"
            output += f"Business: {row['name']}\n"
            output += f"Location: {row['location']}\n"
            output += f"Category: {row['category']}\n"
            output += f"Missing: {row['missing_fields']}\n"
            output += f"Search Query: \"{self.create_search_query(original_row)}\"\n"
            output += f"Google Maps: https://www.google.com/maps/search/{self.create_search_query(original_row).replace(' ', '+')}\n"
            output += "-" * 80 + "\n\n"
        
        # Save to file
        with open(SEARCH_LIST, 'w', encoding='utf-8') as f:
            f.write(output)
        
        print(f"✅ Search list saved: {SEARCH_LIST}\n")
        return len(real_businesses.head(limit))
    
    def generate_update_template(self):
        """Generate template CSV for manual data entry"""
        print("📋 Generating update template...")
        
        missing_df = self.identify_missing_data()
        
        # Filter out placeholders
        real_businesses = missing_df[
            ~missing_df['name'].str.contains('Need|Needed|Seeking|English-Speaking', case=False, na=False)
        ]
        
        # Create template
        template = pd.DataFrame({
            'id': real_businesses['id'],
            'name': real_businesses['name'],
            'location': real_businesses['location'],
            'category': real_businesses['category'],
            'current_address': self.df.loc[real_businesses.index, 'address'],
            'current_phone': self.df.loc[real_businesses.index, 'phone'],
            'current_website': self.df.loc[real_businesses.index, 'website'],
            'NEW_address': '',
            'NEW_phone': '',
            'NEW_website': '',
            'NEW_email': '',
            'notes': ''
        })
        
        template.to_csv(TEMPLATE_CSV, index=False)
        print(f"✅ Template saved: {TEMPLATE_CSV}\n")
        return len(template)
    
    def apply_updates_from_template(self, template_path: Path):
        """Apply updates from filled template"""
        if not template_path.exists():
            print(f"⚠️  Template file not found: {template_path}")
            return 0
        
        print("🔄 Applying updates from template...")
        updates_df = pd.read_csv(template_path)
        updates_applied = 0
        
        for _, update_row in updates_df.iterrows():
            idx = self.df[self.df['id'] == update_row['id']].index
            if len(idx) == 0:
                continue
            
            idx = idx[0]
            updated_fields = []
            
            # Update only if NEW field has data
            if pd.notna(update_row['NEW_address']) and str(update_row['NEW_address']).strip():
                self.df.at[idx, 'address'] = update_row['NEW_address']
                updated_fields.append('address')
            
            if pd.notna(update_row['NEW_phone']) and str(update_row['NEW_phone']).strip():
                self.df.at[idx, 'phone'] = update_row['NEW_phone']
                updated_fields.append('phone')
            
            if pd.notna(update_row['NEW_website']) and str(update_row['NEW_website']).strip():
                self.df.at[idx, 'website'] = update_row['NEW_website']
                updated_fields.append('website')
            
            if pd.notna(update_row['NEW_email']) and str(update_row['NEW_email']).strip():
                self.df.at[idx, 'email'] = update_row['NEW_email']
                updated_fields.append('email')
            
            if updated_fields:
                business_name = self.df.at[idx, 'name']
                print(f"  ✓ {business_name}: {', '.join(updated_fields)}")
                updates_applied += 1
        
        print(f"\n✅ Applied {updates_applied} updates from template\n")
        return updates_applied
    
    def generate_statistics(self) -> Dict:
        """Generate data quality statistics"""
        total = len(self.df)
        
        stats = {
            'total_businesses': total,
            'missing_address': int(self.df['address'].isna().sum()),
            'missing_phone': int(self.df['phone'].isna().sum()),
            'missing_website': int(self.df['website'].isna().sum()),
            'missing_email': int(self.df['email'].isna().sum()),
            'placeholder_entries': int(len(self.df[
                self.df['name'].str.contains('Need|Needed|Seeking', case=False, na=False)
            ])),
            'verified_businesses': int(len(self.df[self.df['verified'] == True])),
            'featured_businesses': int(len(self.df[self.df['featured'] == True])),
        }
        
        # Calculate percentages
        stats['address_completion'] = f"{((total - stats['missing_address']) / total * 100):.1f}%"
        stats['phone_completion'] = f"{((total - stats['missing_phone']) / total * 100):.1f}%"
        stats['website_completion'] = f"{((total - stats['missing_website']) / total * 100):.1f}%"
        
        return stats
    
    def save_updated_data(self):
        """Save the updated dataframe"""
        self.df.to_csv(OUTPUT_CSV, index=False)
        print(f"💾 Updated data saved: {OUTPUT_CSV}\n")

# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    try:
        # Initialize enricher
        enricher = BusinessDataEnricher(INPUT_CSV)
        
        # Apply known corrections
        enricher.apply_known_corrections()
        
        # Generate statistics
        print("📊 DATA QUALITY STATISTICS:")
        print("=" * 80)
        stats = enricher.generate_statistics()
        for key, value in stats.items():
            print(f"  {key.replace('_', ' ').title()}: {value}")
        print("=" * 80 + "\n")
        
        # Save stats to JSON
        with open(STATS_JSON, 'w') as f:
            json.dump(stats, f, indent=2)
        
        # Generate search list
        search_count = enricher.generate_search_list(limit=50)
        
        # Generate template
        template_count = enricher.generate_update_template()
        
        # Check if there's a filled template to apply
        filled_template = OUTPUT_DIR / 'business_updates_template_FILLED.csv'
        if filled_template.exists():
            enricher.apply_updates_from_template(filled_template)
        
        # Save updated data
        enricher.save_updated_data()
        
        # Final summary
        print("=" * 80)
        print("✅ PROCESS COMPLETE!")
        print("=" * 80)
        print(f"\n📂 All files saved to: {OUTPUT_DIR}")
        print(f"\n📝 Next Steps:")
        print(f"  1. Open: {SEARCH_LIST.name}")
        print(f"  2. Search for each business and fill: {TEMPLATE_CSV.name}")
        print(f"  3. Save filled template as: business_updates_template_FILLED.csv")
        print(f"  4. Run this script again to apply updates")
        print(f"\n💡 Tip: Focus on {search_count} businesses in the search list first!\n")
        
    except FileNotFoundError as e:
        print(f"\n❌ ERROR: {e}")
        print(f"\n💡 Make sure to:")
        print(f"  1. Create a 'data' folder in your project root")
        print(f"  2. Place 'businesses_rows.csv' in the data folder")
        print(f"  3. Run this script from the project root\n")
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()