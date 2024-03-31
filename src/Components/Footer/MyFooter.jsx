import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon, MDBInput, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';

export default function MyFooter() {
  return (
    <MDBFooter className='text-center footer' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
         
        </section>

        <section className='mb-4' style={{ marginTop: '40px' }}> {/* Added margin-top */}
          <form action=''>
            <MDBRow className='d-flex align-items-center justify-content-center'> {/* Align items center */}
              <MDBCol md='5'>
                <MDBInput contrast type='email' label='Email address' className='mb-4' placeholder='❤ Subscribe to watch offers' />
              </MDBCol>

              <MDBCol md='auto'> 
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://www.linkedin.com/in/rivan-jaradat-0a84b0235/'>
          Rivan Jaradat
        </a>
      </div>
    </MDBFooter>
  );
}
