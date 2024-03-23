import styles from './NotFound.module.scss'
import clsx from 'clsx';

const NotFound = () => {


    return (
        <section className={clsx(styles['error-page'], styles.section)}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-12">
                        <div className={styles['error-inner']}>
                            <h1>404<span>Oop's  sorry we can't find that page!</span></h1>
                            <p>Please click on "Home" button in the right-upper corrner<br></br>to return to safety.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default NotFound;