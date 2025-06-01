import { Link } from "@heroui/link";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 h-16">
      <div className="w-full h-full flex items-center justify-center">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com?utm_source=next-app-template"
          title="heroui.com homepage"
        >
          <span className="text-gray-600">Powered by</span>
          <p className="text-orange-500 font-medium">HeroUI</p>
        </Link>
      </div>
    </footer>
  );
};
