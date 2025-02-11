function Car_create()
{
    return(
        <>
        
    <h3> <a href="cars_list.html" className="btn btn-light">Go Back</a>Add Car</h3>
    <div className="container">
    
      <div className="form-group mb-3">
            <label for="number" className="form-label">Car Number:</label>
            <input type="text" className="form-control" id="number" placeholder="please enter car number"/>
        </div>
        <div className="form-group mb-3">
            <label for="model" className="form-label">Car Model:</label>
            <input type="text" className="form-control" id="model" placeholder="please enter car model"/>
        </div>
        <div className="form-group mb-3">
            <label for="type" className="form-label">Car Type(SUV/ CUV/ Sedan):</label>
            <input type="text" className="form-control" id="type" placeholder="please enter car type"/>
        </div>
        <button className="btn btn-primary">Create Car</button>
    </div>

    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </>
    );
}
export default Car_create;