import axios from "axios";

export async function getList(medicalId) {
    await axios.get(
      'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500/getAllRecords/' + medicalId,
      {
        headers: {
          Authorization: 'Bearer c60812f728a3356b4ee2b69b5bf4f14d'
        }
      }
    ).then((response) => {
      console.log(response.data)
    })
  }


  export async function getDoctor(doctorId) {
    await axios.get(
      'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500/getDoctor/' + doctorId,
      {
        headers: {
          Authorization: 'Bearer c60812f728a3356b4ee2b69b5bf4f14d'
        }
      }
    ).then((response) => {
      console.log(response.data)
    })
  }
