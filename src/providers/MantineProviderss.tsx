
import { MantineProvider, createTheme } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
const theme = createTheme({});

interface MantineProvidersProps {}
const MantineProviderss: FC<PropsWithChildren<MantineProvidersProps>> = ({ children }) => {
	return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default MantineProviderss;
