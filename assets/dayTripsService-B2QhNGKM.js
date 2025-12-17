import{s as o}from"./index-D4a_-XsO.js";async function c(e){try{let r=o.from("day_trips").select(`
        id,
        base_id,
        base_name,
        name,
        slug,
        distance,
        drive_time,
        train_time,
        description,
        short_description,
        best_for,
        difficulty,
        cost,
        image_url,
        hero_image_url,
        rating,
        is_must_see,
        recommended_duration,
        featured,
        latitude,
        longitude,
        tags:day_trip_tags(
          tag:tags(name)
        )
      `).order("featured",{ascending:!1}).order("rating",{ascending:!1,nullsFirst:!1});const{data:t,error:a}=await r;if(a)throw a;return t.map(s=>({...s,tags:Array.isArray(s.tags)?s.tags.map(n=>({name:n.tag.name})):[]}))}catch(r){throw console.error("Error fetching day trips:",r),r}}async function p(e){try{const{data:r,error:t}=await o.from("day_trips").select(`
        *,
        tags:day_trip_tags(
          tag:tags(name)
        ),
        photos:day_trip_photos(image_url, caption, display_order)
      `).eq("id",e).single();if(t)throw t;return r.tags=Array.isArray(r.tags)?r.tags.map(a=>({name:a.tag.name})):[],r.photos&&Array.isArray(r.photos)&&r.photos.sort((a,i)=>a.display_order-i.display_order),r}catch(r){throw console.error("Error fetching day trip:",r),r}}export{p as a,c as f};
