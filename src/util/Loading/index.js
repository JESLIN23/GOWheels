import { Backdrop, CircularProgress } from '@material-ui/core';
export default function Loader(props) {
  return (
    <Backdrop open={props.isOpen} style={{ zIndex: 4 }}>
      <CircularProgress style={{ color: '#FF851B' }} />
    </Backdrop>
  );
}
