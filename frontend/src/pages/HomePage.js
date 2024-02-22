import React from 'react';

function Home() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw',height: '100vh', position: 'center' }}>
            <img src="https://cdni.autocarindia.com/ExtraImages/20210608054804_Apple_Maps_new.jpg" alt="Image description" style={{ width: '1350px', height: '750px' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange', padding: '10px', borderRadius: '5px', textAlign: 'center',fontFamily: 'Arial' }}>
                <p style={{ fontSize: '26px',  color: 'black' }}>Welcome to</p>
                <p style={{ fontSize: '29px', color: 'black' }}>Fuel Tracker</p>
                <p style={{ fontSize: '16px', color: 'black' }}>Vehicle management</p>
                <p style={{ fontSize: '16px', color: 'black' }}>Fuel log, costs and mileage tracking</p>
                <p style= {{color: 'black' }}><strong>Please log in or sign up to get started!</strong></p>
            </div>
        </div>
    );
}

export default Home;
