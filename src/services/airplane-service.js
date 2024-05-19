const {StatusCodes} = require('http-status-codes');

const AppError = require('../Utils/errors/app-error');
const {AirplaneRepository} = require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name =='SequelizeValidationError'){
            let explanation =[];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }

}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if (error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The Airplane you requested is not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

module.exports ={
    createAirplane,
    getAirplanes,
    getAirplane
}