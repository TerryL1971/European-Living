// src/components/BusinessImage.tsx
import { 
  Utensils, 
  ShoppingBag, 
  Wrench, 
  Home, 
  Scale, 
  GraduationCap, 
  Briefcase,
  Car,
  Building2,
  LucideIcon
} from 'lucide-react';

type BusinessImageProps = {
  imageUrl?: string | null;
  category?: string;
  businessName: string;
  className?: string;
  fallbackType?: 'icon' | 'gradient';
};

// Category to icon and color mapping
const categoryConfig: Record<string, { icon: LucideIcon, gradient: string }> = {
  'restaurants': { 
    icon: Utensils, 
    gradient: 'from-orange-400 to-red-500' 
  },
  'shopping': { 
    icon: ShoppingBag, 
    gradient: 'from-purple-400 to-pink-500' 
  },
  'automotive': { 
    icon: Car, 
    gradient: 'from-blue-400 to-indigo-600' 
  },
  'car-service': { 
    icon: Wrench, 
    gradient: 'from-gray-600 to-gray-800' 
  },
  'home-services': { 
    icon: Home, 
    gradient: 'from-green-400 to-teal-500' 
  },
  'real-estate': { 
    icon: Building2, 
    gradient: 'from-blue-500 to-cyan-600' 
  },
  'legal': { 
    icon: Scale, 
    gradient: 'from-slate-600 to-slate-800' 
  },
  'education': { 
    icon: GraduationCap, 
    gradient: 'from-yellow-400 to-orange-500' 
  },
  'business': { 
    icon: Briefcase, 
    gradient: 'from-indigo-500 to-purple-600' 
  },
};

// Default fallback for unknown categories
const defaultConfig = { 
  icon: Building2, 
  gradient: 'from-gray-400 to-gray-600' 
};

export default function BusinessImage({ 
  imageUrl, 
  category = 'business', 
  businessName,
  className = 'w-full h-48',
  fallbackType = 'gradient'
}: BusinessImageProps) {
  const config = categoryConfig[category.toLowerCase()] || defaultConfig;
  const Icon = config.icon;

  // If image URL exists, try to display it
  if (imageUrl) {
    return (
      <div className={`relative ${className} bg-gray-100 overflow-hidden`}>
        <img
          src={imageUrl}
          alt={businessName}
          className="w-full h-full object-contain"
          onError={(e) => {
            // If image fails to load, hide it and show fallback
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.classList.add('flex', 'items-center', 'justify-center');
              parent.style.background = `linear-gradient(135deg, var(--tw-gradient-stops))`;
              parent.classList.add('bg-gradient-to-br', ...config.gradient.split(' '));
              
              // Add icon
              const iconEl = document.createElement('div');
              iconEl.className = 'text-white opacity-40';
              iconEl.innerHTML = `<svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`;
              parent.appendChild(iconEl);
            }
          }}
        />
      </div>
    );
  }

  // No image URL - show fallback based on type
  if (fallbackType === 'icon') {
    return (
      <div className={`${className} bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
        <Icon className="w-24 h-24 text-white opacity-40" strokeWidth={1.5} />
      </div>
    );
  }

  // Gradient with pattern
  return (
    <div className={`${className} bg-gradient-to-br ${config.gradient} flex items-center justify-center relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Icon */}
      <Icon className="w-24 h-24 text-white opacity-40 relative z-10" strokeWidth={1.5} />
    </div>
  );
}