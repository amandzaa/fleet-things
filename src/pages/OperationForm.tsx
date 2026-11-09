import React, { useState } from 'react';

interface OperationFormData {
  typeOfOperation: string;
  typeOfVehicle: string;
  vehicleBrands: string;
  axleConfiguration: string;
  numberOfVehicle: string;
  vehiclesYear: string;
  odometerRunning: boolean;
  kindOfLoad: string;
  payloadTon: string;
  vehicleWeightTon: string;
  gvwTon: string;
  routes: Array<{
    origin: string;
    destination: string;
    km: string;
  }>;
  numberOfTrips: string;
  frequency: string;
  roadSurface: string;
  averageSpeedFullLoad: string;
  averageSpeedEmptyLoad: string;
  singleServiceRadius: string;
  aggregateLoad: string;
  singleTireLoad: string;
  speed: string;
}

const OperationForm: React.FC = () => {
  const [formData, setFormData] = useState<OperationFormData>({
    typeOfOperation: '',
    typeOfVehicle: '',
    vehicleBrands: '',
    axleConfiguration: '',
    numberOfVehicle: '',
    vehiclesYear: '',
    odometerRunning: true,
    kindOfLoad: '',
    payloadTon: '',
    vehicleWeightTon: '',
    gvwTon: '',
    routes: [{ origin: '', destination: '', km: '' }],
    numberOfTrips: '',
    frequency: '',
    roadSurface: '',
    averageSpeedFullLoad: '',
    averageSpeedEmptyLoad: '',
    singleServiceRadius: '',
    aggregateLoad: '',
    singleTireLoad: '',
    speed: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      odometerRunning: e.target.value === 'yes'
    }));
  };

  const handleRouteChange = (index: number, field: string, value: string) => {
    const updatedRoutes = formData.routes.map((route, i) => {
      if (i === index) {
        return { ...route, [field]: value };
      }
      return route;
    });
    setFormData(prev => ({
      ...prev,
      routes: updatedRoutes
    }));
  };

  const addRoute = () => {
    setFormData(prev => ({
      ...prev,
      routes: [...prev.routes, { origin: '', destination: '', km: '' }]
    }));
  };

  const removeRoute = (index: number) => {
    if (formData.routes.length > 1) {
      setFormData(prev => ({
        ...prev,
        routes: prev.routes.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Operation Details</h1>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type of Operation</label>
            <select
              name="typeOfOperation"
              value={formData.typeOfOperation}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="commercial">Commercial</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type of Vehicle</label>
            <select
              name="typeOfVehicle"
              value={formData.typeOfVehicle}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Vehicle Type</option>
              <option value="truck">Truck</option>
              <option value="bus">Bus</option>
              <option value="van">Van</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Brands</label>
            <input
              type="text"
              name="vehicleBrands"
              value={formData.vehicleBrands}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Axle Configuration</label>
            <select
              name="axleConfiguration"
              value={formData.axleConfiguration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Configuration</option>
              <option value="4x2">4x2</option>
              <option value="6x4">6x4</option>
              <option value="8x4">8x4</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Odometer Running</label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="odometerRunning"
                  value="yes"
                  checked={formData.odometerRunning}
                  onChange={handleRadioChange}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="odometerRunning"
                  value="no"
                  checked={!formData.odometerRunning}
                  onChange={handleRadioChange}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Routes</h2>
          {formData.routes.map((route, index) => (
            <div key={index} className="flex space-x-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Origin</label>
                <input
                  type="text"
                  value={route.origin}
                  onChange={(e) => handleRouteChange(index, 'origin', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <input
                  type="text"
                  value={route.destination}
                  onChange={(e) => handleRouteChange(index, 'destination', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">KM</label>
                <input
                  type="text"
                  value={route.km}
                  onChange={(e) => handleRouteChange(index, 'km', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeRoute(index)}
                className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRoute}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            + Add Route
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Trips</label>
            <input
              type="text"
              name="numberOfTrips"
              value={formData.numberOfTrips}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Average Speed Full Load (KPH)</label>
            <input
              type="text"
              name="averageSpeedFullLoad"
              value={formData.averageSpeedFullLoad}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Average Speed Empty Load (KPH)</label>
            <input
              type="text"
              name="averageSpeedEmptyLoad"
              value={formData.averageSpeedEmptyLoad}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default OperationForm;
