<!-- @format -->

# 🖼️ Image Size Configuration Guide

## ✅ **What's Been Implemented**

I've set up a comprehensive image size management system for your API image fetching. All course poster images now fetch at **1280px × 1280px** as requested.

### **Components Updated:**

- ✅ `CourseCard.tsx` (Most Popular Course Card)
- ✅ `ScholarshipCard.tsx` (Scholarship Program Card)
- ✅ `ShortCourseCard.tsx` (Short Course Card)
- ✅ `ShortCourseCardActive.tsx` (Active Short Course Card)

### **New Files Created:**

- ✅ `/src/utils/imageUtils.ts` - Image URL transformation utilities
- ✅ `/src/config/imageConfig.ts` - Centralized size configurations

## 🔧 **How It Works**

### **Before (Original):**

```tsx
<Image src={openingProgram?.posterUrl ?? "/fallback.png"} />
```

### **After (With Size Parameters):**

```tsx
<Image src={addImageSizeParams(openingProgram?.posterUrl, 1280, 1280)} />
```

The utility function adds size parameters to your API image URLs:

- **Original URL:** `https://api.example.com/images/poster123.jpg`
- **With Size:** `https://api.example.com/images/poster123.jpg?width=1280&height=1280`

## ⚙️ **Configuration Options**

### **1. Using Default Size (1280×1280):**

```tsx
import { addImageSizeParams } from "@/utils/imageUtils";

// Uses default 1280x1280
<Image src={addImageSizeParams(posterUrl)} />;
```

### **2. Using Custom Size:**

```tsx
// Custom size
<Image src={addImageSizeParams(posterUrl, 800, 600)} />
```

### **3. Using Predefined Sizes:**

```tsx
import { addImageSize } from '@/utils/imageUtils';

// Predefined sizes
<Image src={addImageSize(posterUrl, 'poster')} />     // 1280x1280
<Image src={addImageSize(posterUrl, 'thumbnail')} />  // 320x320
<Image src={addImageSize(posterUrl, 'preview')} />    // 800x800
```

## 📋 **Available Size Presets**

| Size Type   | Dimensions | Use Case             |
| ----------- | ---------- | -------------------- |
| `poster`    | 1280×1280  | Course/Program cards |
| `thumbnail` | 320×320    | Small previews       |
| `preview`   | 800×800    | Medium displays      |
| `hero`      | 1920×1080  | Banner images        |
| `profile`   | 512×512    | User avatars         |

## 🎛️ **Easy Configuration Changes**

To change sizes globally, edit `/src/config/imageConfig.ts`:

```typescript
export const IMAGE_CONFIG = {
	POSTER_WIDTH: 1280, // Change this to modify default poster size
	POSTER_HEIGHT: 1280, // Change this to modify default poster size
	// ... other sizes
};
```

## 🔀 **Backend/CDN Compatibility**

The system supports multiple URL parameter formats:

### **Generic Format (Current):**

```
?width=1280&height=1280
```

### **CDN-Specific Formats:**

```typescript
// For Cloudinary
addCloudinarySize(url, 1280, 1280);
// Result: /upload/w_1280,h_1280/image.jpg

// For ImageKit
addImageKitSize(url, 1280, 1280);
// Result: ?tr=w-1280,h-1280

// For AWS S3 + Lambda
addS3LambdaSize(url, 1280, 1280);
// Result: ?w=1280&h=1280
```

## 🔄 **Switching CDN Formats**

If your backend uses a different format, simply update the import:

```tsx
// Change from:
import { addImageSizeParams } from "@/utils/imageUtils";

// To (for example, Cloudinary):
import { addCloudinarySize as addImageSizeParams } from "@/utils/imageUtils";
```

## 🚀 **Benefits**

- ✅ **Better Performance:** Smaller file sizes for faster loading
- ✅ **Consistent Quality:** All images use same high resolution
- ✅ **Easy Maintenance:** Change sizes globally from one config file
- ✅ **CDN Ready:** Support for popular image transformation services
- ✅ **Fallback Safe:** Handles missing URLs gracefully

## 📱 **Testing**

After deployment, check your network tab to verify URLs have size parameters:

```
✅ Good: https://api.example.com/image.jpg?width=1280&height=1280
❌ Bad:  https://api.example.com/image.jpg
```

Your course images will now consistently fetch at 1280px × 1280px resolution! 🎯
