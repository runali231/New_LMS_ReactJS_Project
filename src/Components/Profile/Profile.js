import { Call, Email, LinkedIn, LocationCity, LocationDisabled, LocationOn, PhoneCallback } from '@material-ui/icons'
import React from 'react'
import { Phone } from 'react-bootstrap-icons'

const Profile = () => {
    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-lg-4'>
                  <div className="card">
                    <img src="Images/team-3.jpg" style={{"height":"30vh"}}/>
                  </div>
                         <div className="card">
                   <div>
                    <h5 className='fw-bold'><LocationOn/>&nbsp;Address</h5>
                    <p>Badlapur (E). 421503</p>
                    
                   </div>
                   <hr style={{"backgroundColor":"black"}}/>
                      <div>
                    <h5 className='fw-bold'><Email/>&nbsp;Email</h5>
                    <p>kadamrunali50@gmail.com</p>
                   </div>
                   <hr style={{"backgroundColor":"black"}}/>
                      <div>
                    <h5 className='fw-bold'><Call/>&nbsp;Phone</h5>
                    <p>+91 9075372928</p>
                   </div>
                   <hr style={{"backgroundColor":"black"}}/>
                      <div>
                    <h5 className='fw-bold'><LinkedIn/>&nbsp;LinkedIn / Twitter Profile</h5>
                    <p>+91 9075372928</p>
                   </div>
                  </div>
                    </div>
                    
                    <div className='col-lg-8'>
                        <div className='card'>
                            <div className='card-header' style={{ "backgroundColor": "white" }}>
                                <h4>Profile Information</h4>
                            </div>
                            <div className='card-body'>
                                <form>

                                    <div className="mb-3">
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" id="fullName" placeholder="Full Name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="contactInfo" className="form-label">Contact Information</label>
                                        <input type="text" className="form-control" id="contactInfo" placeholder="Phone number, address, etc." />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                                        <input type="file" className="form-control" id="profilePicture" />
                                        <small className="form-text text-muted">Upload a new profile picture.</small>
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="bio" className="form-label">Biography</label>
                                        <textarea className="form-control" id="bio" rows="4" placeholder="Write a brief biography or introduction"></textarea>
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="linkedin" className="form-label">LinkedIn Profile</label>
                                        <input type="url" className="form-control" id="linkedin" placeholder="LinkedIn Profile URL" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="twitter" className="form-label">Twitter Profile</label>
                                        <input type="url" className="form-control" id="twitter" placeholder="Twitter Profile URL" />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </>
    )
}

export default Profile