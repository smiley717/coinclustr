import styled from 'styled-components'

const DashboardWrapper = styled.div`
    @media (max-width: 500px){
        flex-direction: column;
        align-items: flex-start;
    }
    div {
        @media (max-width: 500px){
            width: 100%;
            margin-bottom: 10px;
        }
    }
`;

export default DashboardWrapper;