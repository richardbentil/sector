import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

function SectorsSelect({ workSector, setWorkSector, router, setFilterSector, user }: any) {
  const [sectors, setSectors] = useState<any>({ manufacturing: [], services: [], other: [] })
  const [error, setError] = useState("")

  const filterSectors = (data: any) => {
              let services: any = [];
              let manufacturing: any = []
              let other: any = []
              let food: any = []
              let furniture = []
              let machinery = []
              let metalworking = []
              let plasticAndRubber = []
              let printing = []
              let wood = []
              let info = []
              let trans = []
    
              for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.main == "Service" && !element?.sub) {
                  services?.push(element)
                }

                if (element.main == "manufacturing") {
                  manufacturing?.push(element)
                }

                if (element.main == "Other") {
                  other?.push(element)
                } 

                if (element.sub == "Food and Beverage") {
                  food?.push(element)
                } 

                if (element.sub == "Furniture") {
                  furniture?.push(element)
                } 

                if (element.sub == "Machinery") {
                  machinery?.push(element)
                }
                
                if (element.sub == "Metalworking") {
                  metalworking?.push(element)
                }

                if (element.sub == "Plastic and Rubber") {
                  plasticAndRubber?.push(element)
                }

                if (element.sub == "Printing") {
                  printing?.push(element)
                }

                if (element.sub == "Wood") {
                  wood?.push(element)
                }

                if (element.sub == "Information Technology and Telecommunications") {
                  info.push(element)
                }

                if (element.sub == "Transport and Logistics") {
                  trans.push(element)
                }
              }
              return {manufacturing, services, other, food, furniture, machinery, metalworking, plasticAndRubber, printing, wood, info, trans}
  }

    const getSectors = useCallback(async () => {
      try{
          const response = await axios.get("/api/sectors")
        
          if (response.status !== 200) {
            return
          } else {
            if (!response?.data?.msg) {  
              sessionStorage.setItem("sectors", JSON.stringify(response?.data))
              const finalData = user?.name ?
              response?.data?.filter((item: any) => item.name == workSector)
              : response?.data
              setFilterSector(finalData)
              const { manufacturing, services, other, food, furniture, machinery, metalworking, plasticAndRubber, wood, info, trans } = filterSectors(response?.data)
              setSectors({ manufacturing, services, other, food, furniture, machinery, metalworking, plasticAndRubber, wood, info, trans })
            }
          }
      } catch (error: any) {
          setError("There was an error")
      }
    }, [])

  useEffect(() => {
      if (router.isReady) {
          const session = sessionStorage.getItem("sectors")
          if (session) {
            const data = JSON.parse(session)
            const finalData = user?.name ?
              data?.filter((item: any) => item.name == workSector)
              : data
            setFilterSector(finalData)
            const { manufacturing, services, other, food, furniture, machinery, metalworking, plasticAndRubber, wood, info, trans } = filterSectors(data)
            setSectors({manufacturing, services, other, food, furniture, machinery, metalworking, plasticAndRubber, wood, info, trans})
          } else {
            getSectors()
          } 
      }
    }, [getSectors, router.isReady, setFilterSector, user?.name, workSector])

  return (
    <select className="form-select" name="sector" id="sector" value={workSector} onChange={(e) => setWorkSector(e.target.value)}>
      <option value="">Select your sector</option>
      <optgroup label="Manufacturing">
         
      </optgroup>
      <optgroup label="Food and Beverages" className='ms-5'>
            {sectors?.food?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Furniture">
            {sectors?.furniture?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Machinery">
            {sectors?.machinery?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Metal working">
            {sectors?.metalworking?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Plastic and rubber">
            {sectors?.plasticAndRubber?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Wood">
            {sectors?.wood?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Other">
            {sectors?.other?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Services">
            {sectors?.services?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Information Technology and Telecommunications">
            {sectors?.info?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
      <optgroup label="Transport and Logistics">
            {sectors?.trans?.map((item: any, index: number) => (
              <option key={index} value={item?.name}>{item?.name}</option>
            ))}
      </optgroup>
    </select>
  )
}

export default SectorsSelect