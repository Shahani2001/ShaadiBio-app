import { createContext, useContext, useState, useEffect } from 'react'

const BiodataContext = createContext(null)

const initialBiodata = {
  // Personal Details
  fullName: '',
  dateOfBirth: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  maritalStatus: '',
  currentAddress: '',
  nativePlace: '',
  contactNumber: '',
  email: '',
  profilePhoto: '',
  aboutMe: '',
  
  // Family Details
  fatherName: '',
  fatherProfession: '',
  motherName: '',
  motherProfession: '',
  siblings: '',
  familyType: '',
  familyStatus: '',
  familyValues: '',
  
  // Education & Profession
  highestEducation: '',
  collegeName: '',
  profession: '',
  jobTitle: '',
  employerName: '',
  annualIncome: '',
  workLocation: '',
  
  // Horoscope (Optional)
  timeOfBirth: '',
  placeOfBirth: '',
  rashi: '',
  nakshatra: '',
  mangalStatus: '',
  gotra: ''
}

export function BiodataProvider({ children }) {
  const [biodatas, setBiodatas] = useState([])
  const [currentBiodata, setCurrentBiodata] = useState({ ...initialBiodata })
  const [selectedTemplate, setSelectedTemplate] = useState('classic')

  useEffect(() => {
    // Load biodatas from localStorage
    const storedBiodatas = localStorage.getItem('shaadibio_biodatas')
    if (storedBiodatas) {
      setBiodatas(JSON.parse(storedBiodatas))
    }
  }, [])

  const saveBiodata = (biodata) => {
    const newBiodata = {
      ...biodata,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      template: selectedTemplate
    }
    
    const updatedBiodatas = [...biodatas, newBiodata]
    setBiodatas(updatedBiodatas)
    localStorage.setItem('shaadibio_biodatas', JSON.stringify(updatedBiodatas))
    
    return newBiodata
  }

  const updateBiodata = (id, updates) => {
    const updatedBiodatas = biodatas.map(b => 
      b.id === id 
        ? { ...b, ...updates, updatedAt: new Date().toISOString() }
        : b
    )
    setBiodatas(updatedBiodatas)
    localStorage.setItem('shaadibio_biodatas', JSON.stringify(updatedBiodatas))
  }

  const deleteBiodata = (id) => {
    const updatedBiodatas = biodatas.filter(b => b.id !== id)
    setBiodatas(updatedBiodatas)
    localStorage.setItem('shaadibio_biodatas', JSON.stringify(updatedBiodatas))
  }

  const getBiodataById = (id) => {
    return biodatas.find(b => b.id === parseInt(id))
  }

  const resetCurrentBiodata = () => {
    setCurrentBiodata({ ...initialBiodata })
  }

  const calculateAge = (dob) => {
    if (!dob) return ''
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age.toString()
  }

  return (
    <BiodataContext.Provider value={{
      biodatas,
      currentBiodata,
      setCurrentBiodata,
      selectedTemplate,
      setSelectedTemplate,
      saveBiodata,
      updateBiodata,
      deleteBiodata,
      getBiodataById,
      resetCurrentBiodata,
      calculateAge,
      initialBiodata
    }}>
      {children}
    </BiodataContext.Provider>
  )
}

export function useBiodata() {
  const context = useContext(BiodataContext)
  if (!context) {
    throw new Error('useBiodata must be used within a BiodataProvider')
  }
  return context
}
