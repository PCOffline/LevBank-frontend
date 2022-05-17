import './Home.css';
import UserInfo from './UserInfo';
import Transactions from './Transactions';

export default function Home(props) {


  return (
    <div className='home'>
      <UserInfo user={props.user} />
      <Transactions user={props.user} />
    </div>
  );
}
