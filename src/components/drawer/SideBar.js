import { useEffect, useState } from 'react';

function SideBar() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
  }, []);
}
