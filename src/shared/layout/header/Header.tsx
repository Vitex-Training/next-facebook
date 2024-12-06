import LogoSearch from './LogoSearch';
import MainNav from './MainNav';
import MenuSettingNav from './MenuSettingNav';

export default function Header() {
  return (
    <header className='flex h-header items-center justify-between bg-white px-4 py-2'>
      <LogoSearch />

      <div className='fixed left-[300px] right-[206px] top-0 hidden h-header md:block'>
        <MainNav />
      </div>

      <MenuSettingNav />
    </header>
  );
}
