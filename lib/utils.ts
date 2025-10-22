// A simple utility to merge class names, inspired by shadcn/ui.
// In a larger project, you might use libraries like `clsx` and `tailwind-merge`.
export const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
}
