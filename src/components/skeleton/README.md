<!-- @format -->

# Skeleton Loading Components

A comprehensive skeleton loading system for the EXSTAD frontend application. This system provides smooth loading states that match your page structure and enhance user experience.

## 🎯 Features

- **Multiple skeleton variants**: Rectangular, circular, text, and rounded skeletons
- **Animated shimmer effects**: Beautiful gradient animations
- **Framer Motion integration**: Smooth transitions and staggered animations
- **Responsive design**: Works across all screen sizes
- **Modular components**: Use individual skeletons or complete page skeletons
- **Dark mode support**: Automatically adapts to your theme

## 📁 File Structure

```
src/components/skeleton/
├── index.ts                     # Export all skeleton components
├── PageSkeleton.tsx            # Basic full-page skeleton
├── EnhancedPageSkeleton.tsx    # Advanced skeleton with animations
├── LoadingWrapper.tsx          # Wrapper component for loading states
├── ExampleImplementation.tsx   # Usage examples
└── README.md                   # This file
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { LoadingWrapper } from "@/components/skeleton";

export default function MyPage() {
	return (
		<LoadingWrapper loadingDuration={2000}>
			{/* Your page content */}
			<div>Your actual page content here</div>
		</LoadingWrapper>
	);
}
```

### Advanced Usage with Enhanced Skeleton

```tsx
import { EnhancedPageSkeleton } from "@/components/skeleton";

export default function MyPage() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate data loading
		setTimeout(() => setIsLoading(false), 2500);
	}, []);

	if (isLoading) {
		return <EnhancedPageSkeleton />;
	}

	return <YourActualContent />;
}
```

## 🧩 Available Components

### 1. PageSkeleton

Basic skeleton that matches your main page structure.

```tsx
import { PageSkeleton } from "@/components/skeleton";

<PageSkeleton />;
```

### 2. EnhancedPageSkeleton

Advanced skeleton with Framer Motion animations and better visual effects.

```tsx
import { EnhancedPageSkeleton } from "@/components/skeleton";

<EnhancedPageSkeleton />;
```

### 3. LoadingWrapper

Wrapper component that automatically manages loading states.

```tsx
import { LoadingWrapper } from "@/components/skeleton";

<LoadingWrapper
	loadingDuration={3000} // Optional: default 2000ms
	className='custom-class' // Optional: additional CSS classes
>
	<YourContent />
</LoadingWrapper>;
```

### 4. Individual Skeleton Components

```tsx
import {
  HeroSkeleton,
  StatsSkeleton,
  CourseCardSkeleton
} from "@/components/skeleton";

// Use individual components
<HeroSkeleton />
<StatsSkeleton />
<CourseCardSkeleton />
```

## 🎨 Customization

### Custom Skeleton Element

```tsx
import { SkeletonElement } from "@/components/skeleton/EnhancedPageSkeleton";

<SkeletonElement className='w-full h-20' variant='rounded' animate={true} />;
```

### Variants Available:

- `rectangular`: Sharp corners (default)
- `circular`: Perfect circle
- `text`: Optimized for text content
- `rounded`: Rounded corners

### Custom Loading Duration

```tsx
<LoadingWrapper loadingDuration={5000}>
	{" "}
	// 5 seconds
	<YourContent />
</LoadingWrapper>
```

## 🎭 Animation Features

### Shimmer Effect

The skeleton includes a beautiful shimmer animation that moves across each element:

```css
@keyframes shimmer {
	0% {
		background-position: -200% 0;
	}
	100% {
		background-position: 200% 0;
	}
}
```

### Staggered Animations

Components appear with staggered timing for a more natural feel:

```tsx
// Statistics cards appear with 0.1s delay between each
{
	[...Array(8)].map((_, index) => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}>
			<SkeletonElement />
		</motion.div>
	));
}
```

## 🌙 Dark Mode Support

The skeleton automatically adapts to your theme:

```css
/* Light mode */
bg-gray-200 via-gray-300 to-gray-200

/* Dark mode */
dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
```

## 📱 Responsive Design

All skeleton components are fully responsive and match your actual page layout:

```tsx
// Responsive grid that matches your actual stats section
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
	{/* Skeleton elements */}
</div>
```

## ⚡ Performance Tips

1. **Use appropriate loading duration**: Don't make users wait too long
2. **Match your actual layout**: Keep skeleton structure similar to real content
3. **Progressive loading**: Show skeletons for sections as they load
4. **Preload critical resources**: Use skeletons while loading essential data

## 🔧 Integration with Existing Code

### Replace your current page.tsx:

```tsx
// Before
export default function Home() {
	return <YourPageContent />;
}

// After
import { LoadingWrapper } from "@/components/skeleton";

export default function Home() {
	return (
		<LoadingWrapper loadingDuration={2500}>
			<YourPageContent />
		</LoadingWrapper>
	);
}
```

### For conditional loading:

```tsx
import { EnhancedPageSkeleton } from "@/components/skeleton";

export default function Home() {
	const { data, isLoading } = useYourDataHook();

	if (isLoading) {
		return <EnhancedPageSkeleton />;
	}

	return <YourPageContent data={data} />;
}
```

## 🎯 Best Practices

1. **Match real content**: Skeleton should resemble actual layout
2. **Appropriate timing**: 1.5-3 seconds is usually optimal
3. **Progressive disclosure**: Show content as it becomes available
4. **Accessibility**: Include proper ARIA labels
5. **Performance**: Don't over-animate on mobile devices

## 🚨 Common Issues & Solutions

### Issue: Skeleton doesn't match actual content

**Solution**: Update skeleton structure to match your page layout

### Issue: Animation feels too slow/fast

**Solution**: Adjust `loadingDuration` prop or animation delays

### Issue: Skeleton appears briefly after content loads

**Solution**: Ensure your data loading logic properly sets loading states

## 📄 Example Implementation

See `ExampleImplementation.tsx` for a complete example of how to integrate skeleton loading with your existing page structure.

## 🤝 Contributing

When adding new sections to your app:

1. Update the skeleton components to match new layouts
2. Test loading states across different screen sizes
3. Ensure animations feel natural and not overwhelming
4. Maintain consistency with existing skeleton patterns

---

**Happy coding! 🎉**
