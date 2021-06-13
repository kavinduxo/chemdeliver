import axios from "axios";


const instancePrescription = axios.create({
  baseURL: 'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500',
  timeout: 1000000,
  headers: { Authorization: `Bearer c60812f728a3356b4ee2b69b5bf4f14d` }
});


export const getList = async (medicalId) => {
  try {
      const response = await instancePrescription.get(`/getAllRecords/${medicalId}`);
      console.log("Success")
      return response.data;
  } catch (err) {
      console.log("Error")
      return null;
  }
}


// export async function getList(medicalId) {
//     await axios.get(
//       'http://ec2-54-66-253-23.ap-southeast-2.compute.amazonaws.com:6500/getAllRecords/' + medicalId,
//       {
//         headers: {
//           Authorization: 'Bearer c60812f728a3356b4ee2b69b5bf4f14d'
//         }
//       }
//     ).then((response) => {
//       return response.data;
//     }).catch(
//       console.log("Error")
//     )
//   }
  

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
