import { HeaderButton, ButtonStatus, ButtonType } from './HeaderButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

const imageWidth = 103;
const imageHeight = 32.25;

const Header: React.FC = () => {

  const { pathname } = useRouter();
  const homeButtonStatus = pathname === '/' ? ButtonStatus.CurrentPage : ButtonStatus.Inactive;
  const loginButtonStatus = pathname === '/login' ? ButtonStatus.CurrentPage : ButtonStatus.Inactive;

  return (
    <header className="flex flex-row justify-between p-2 px-4 bg-primary shadow-[0_3px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center">
        <Image className="mr-1" src="/images/Brand.png" alt="ucll" width={imageWidth} height={imageHeight} />
        <h1>ISP submission system</h1>
      </div>
      <nav className="flex items-center">
        <HeaderButton buttonType={ButtonType.Home} buttonStatus={ButtonStatus.Inactive} />
        <HeaderButton buttonType={ButtonType.Login} buttonStatus={ButtonStatus.Inactive} />
      </nav>
    </header>
  );
};

export default Header;
