import { GivEatLogo } from "./GivEatLogo";
import { ProfileMenu } from "./ProfileMenu";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <GivEatLogo />
        <h2 className="hidden sm:block text-xl font-semibold text-primary">{title}</h2>
        <ProfileMenu />
      </div>
    </header>
  );
}
