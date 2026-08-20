import { useState } from "react";
import axios from "axios";
import "./AddBusiness.css";

function AddBusiness() {

  const initialForm = {
    business_name: "",
    category: "",
    city: "",
    address: "",
    phone: "",
    source: ""
  };


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

  };


  const resetForm = () => {
    setForm(initialForm);
  };


  const submitForm = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      await axios.post(
        "http://127.0.0.1:8000/add-business",
        {
          ...form,

          business_name: form.business_name.trim(),
          category: form.category.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          phone: form.phone.trim(),
          source: form.source.trim()
        }
      );


      alert("Business Added Successfully");


      resetForm();
      setOpen(false);


    } catch(error){

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Failed to add business"
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <>

      <button
        className="add-btn"
        onClick={() => setOpen(true)}
      >
        + Add Business
      </button>



      {open && (

        <div className="modal">

          <div className="modal-box">

            <h2>Add New Business</h2>


            <form onSubmit={submitForm}>


              <input
                name="business_name"
                placeholder="Business Name"
                value={form.business_name}
                onChange={handleChange}
                required
              />


              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
              />


              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
              />


              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />


              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                type="tel"
                onChange={handleChange}
              />


              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Source
                </option>

                <option value="Google Maps">
                  Google Maps
                </option>

                <option value="Website">
                  Website
                </option>

                <option value="Facebook">
                  Facebook
                </option>

                <option value="Referral">
                  Referral
                </option>

                <option value="Walk In">
                  Walk In
                </option>

              </select>



              <div className="button-group">


                <button
                  className="save-btn"
                  type="submit"
                  disabled={loading}
                >

                  {
                    loading
                    ? "Saving..."
                    : "Save Business"
                  }

                </button>



                <button
                  type="button"
                  className="cancel-btn"
                  onClick={()=>{
                    resetForm();
                    setOpen(false);
                  }}
                >

                  Cancel

                </button>


              </div>


            </form>


          </div>

        </div>

      )}


    </>

  );

}


export default AddBusiness;