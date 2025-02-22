import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ProjectInfo({ showForm, handleCloseForm }
) {
  return (
    <>
      <Modal
        show={showForm}
        onHide={handleCloseForm}
        backdrop="static"
        keyboard={false}
        centered
        className="info-modal"
        size='lg'
      >
            <div className="info-modal-header modal-header">
              <h5 className="modal-title" style={{fontWeight:'bold'}} id="exampleModalLongTitle">Welcome to Welder!</h5>
              <button type="button" onClick={handleCloseForm} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="info-modal-text-container">
                <h1 className="text-center mb-3">Tech Stack</h1>
                <div className="card-deck row" id="tech-stack-deck">
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/HTML5.svg" alt="HTML5"/>
                          <div className="info-card-body">
                            <h5 className="info-card-title card-title text-center">HTML5</h5>
                          </div>
                    </div>  
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/CSS3.svg" alt="CSS3"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">CSS3</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/ReactBootstrap.svg" alt="ReactBootstrap"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">React Bootstrap</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/React.svg" alt="React"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">React</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/Redux.svg" alt="Redux"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">Redux</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/Express.svg" alt="Express"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">Express</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/Sequelize.svg" alt="Sequelize"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">Sequelize</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/Node.js.svg" alt="Node.js"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">Node.js</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/PostgresSQL.svg" alt="PostgresSQL"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">PostgresSQL</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="tech-icon-container">
                      <img className="info-card-img" src="/images/JavaScript.svg" alt="JavaScript"/>
                      <div className="info-card-body card-body">
                        <h5 className="info-card-title card-title text-center">JavaScript</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-description description">
                  <h2>
                    Description
                  </h2>
                  <p>
                    A web application for managing a welding business.
                  </p>
                  <h2>Github</h2>
                  <ul>
                    <li><a href='https://github.com/rdport/welder-client.git'>welder-client</a></li>
                    <li><a href='https://github.com/rdport/welder-server.git'>welder-server</a></li>
                  </ul>
                  <h2>Features</h2>
                    <ul>
                      <li>Secure authentication using acces token stored in memory, with 1-hour validity, and refresh token stored in HTTPOnly cookie, with 1-day validity.</li>
                      <li>Users with standard class cannot access restricted contents, while those with master class have no limit.<br></br>
                    For testing, use the following data which have been added to the database:<br></br>
                          <br></br>
                          <p className="mb-0" style={{fontWeight: 'bold'}}>Steven Rich</p>
                          email: stevenrich@mail.com<br></br>
                          password: 1234567<br></br>
                          class: master<br></br>
                          <br></br>
                          <p className="mb-0" style={{fontWeight:'bold'}}>Eddy</p>
                          email: eddy@mail.com<br></br>
                          password: 1234567<br></br>
                          class: standard
                        </li><br></br>
                        <li>Drag and drop to rearrange items.<br></br>
                            For testing purposes only, please go to Material Purchases, 
                            click the red button on the toolbar below the navbar to enable drag and drop based on PurchaseId. 
                            The purpose is to reorder the materials which appear in the Purchase section (the Purchase section is still in development).
                        </li>
                        <li>Create, edit and delete items in each section</li>
                        <li>Infinite scrolling limits API response to return only 20 items for each API call</li>
                        <li>Database transaction is used to ensure data integrity</li>
                        <li>Responsive design enables this website to adapt to the size of the screen</li>
                    </ul>
                    <h2>P.S.</h2>
                    <ul>
                      <li>This project is still in development, there are only two accessible sections, Customers and Material Purchases.</li>
                      <li>The backend of this project has been completed and can be tested using REST Client from VS Code by using a file named "request.rest" provided in <a href="https://github.com/rdport/welder-server">welder-server</a> on github.</li>
                      <li>This project is using free-tier hosting so this website might not always be accessible and a significant initial loading time is expected.</li>
                    </ul>
                </div>
            </div>
            <Modal.Footer>
              <Button variant="info" onClick={handleCloseForm}>
                Close
              </Button>
            </Modal.Footer>
      </Modal>
    </>
  );
}
