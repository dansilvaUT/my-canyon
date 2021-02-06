import Header from '../../Components/Header/Header';
import Canyons from '../../Components/Canyons/Canyons';
import Typography from '@material-ui/core/Typography';
import './dashboard.scss';
const DashboardContainer = props => {
    return (
        <>
            <Header />
            <section className="dashboard">
                <Typography variant="h2" className='heading dashboard-header'>
                    Browse Canyons
            </Typography>
                <Canyons />
            </section>
        </>
    )
}

export default DashboardContainer;