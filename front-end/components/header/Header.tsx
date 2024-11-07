import { HeaderButton, ButtonStatus, ButtonType } from './HeaderButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

const IMAGE_WIDTH = 103;
const IMAGE_HEIGHT = 32.25;

const Header: React.FC = () => {

  const { pathname } = useRouter();
  const homeButtonStatus = pathname === '/' ? ButtonStatus.CurrentPage : ButtonStatus.Active;
  const loginButtonStatus = pathname === '/login' ? ButtonStatus.CurrentPage : ButtonStatus.Active;

  return (
    <header className="flex flex-row justify-between p-2 px-4 bg-primary shadow-[0_3px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center">
        <Image priority className="mr-1 w-auto h-auto" src="/images/Brand.svg" alt="ucll" width={IMAGE_WIDTH} height={IMAGE_HEIGHT}/>
        <h1>ISP submission system</h1>
      </div>
      <nav className="flex items-center">
        <HeaderButton buttonType={ButtonType.Home} buttonStatus={homeButtonStatus} />
        <HeaderButton buttonType={ButtonType.Login} buttonStatus={loginButtonStatus} />
      </nav>
    </header>
  );
};

export default Header;
