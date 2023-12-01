import DescribeGrievance from "./DescribeGrievance";
import { Link } from 'react-router-dom';
import Header from './Header';

const Lodge = () => {
    const id = localStorage.getItem('user_id');
    const name = `User ${id}`;

    return (
    <div className="App">
        <Header />
        <Link user={name} filter="adm" but="lodge"/>
        <DescribeGrievance />
    </div>
    )
}

export default Lodge;
