import BasicInfo from '../../components/profile/basic/BasicInfo';
import Hobby from '../../components/profile/hobby/Hobby';
import Motto from '../../components/profile/motto/Motto';
import './style.scss';

const Profile = () => {
    return (
        <main className="profile">
            <Motto />
            <Hobby />
            <BasicInfo />
        </main>
    );
};

export default Profile;
