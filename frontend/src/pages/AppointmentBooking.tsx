import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type FormState = {
  fullName: string
  phone: string
  email: string
  dob: string
  department: string
  preferredDate: string
  preferredTime: string
  reason: string
  isExisting: string
  patientCode: string
}

const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Gynecology',
  'General Medicine',
  'Diagnostics / Radiology',
  'Emergency Care',
  'Other',
]

const TIME_SLOTS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
]

export default function AppointmentBooking() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    department: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
    isExisting: 'no',
    patientCode: '',
  })
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  function validateStep1() {
    const errs: Partial<FormState> = {}
    if (!form.fullName.trim()) errs.fullName = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    if (form.isExisting === 'yes' && !form.patientCode.trim())
      errs.patientCode = 'Patient code is required for existing patients'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function validateStep2() {
    const errs: Partial<FormState> = {}
    if (!form.department) errs.department = 'Please select a department'
    if (!form.preferredDate) errs.preferredDate = 'Please select a date'
    if (!form.preferredTime) errs.preferredTime = 'Please select a time slot'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function nextStep() {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  // Today's date for min date restriction
  const today = new Date().toISOString().split('T')[0]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Appointment Requested!</h2>
          <p className="text-gray-600 mb-2">
            Thank you, <strong>{form.fullName}</strong>. Your appointment request has been received.
          </p>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 text-left shadow-sm">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-1">Department</p>
                <p className="font-semibold text-gray-800">{form.department}</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-1">Preferred Date</p>
                <p className="font-semibold text-gray-800">{new Date(form.preferredDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-1">Time Slot</p>
                <p className="font-semibold text-gray-800">{form.preferredTime}</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-1">Contact</p>
                <p className="font-semibold text-gray-800">{form.phone}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Our reception team will call you within 2 hours to confirm. For emergencies, call{' '}
            <a href="tel:+912025678911" className="text-red-600 font-semibold">+91-20-2567-8911</a>.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ fullName: '', phone: '', email: '', dob: '', department: '', preferredDate: '', preferredTime: '', reason: '', isExisting: 'no', patientCode: '' }) }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Book Another
            </button>
            <Link to="/" className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow group-hover:bg-blue-700 transition">M</div>
            <div>
              <p className="font-bold text-gray-800 text-sm leading-tight">Meera Multispecialty</p>
              <p className="text-xs text-gray-400">Hospital</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <a href="tel:+912025678922" className="hidden sm:flex items-center gap-2 text-sm text-blue-700 font-medium hover:text-blue-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91-20-2567-8922
            </a>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
              Staff Login
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
            Online Appointment Booking
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Book Your Appointment</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Fill in the form below and our reception team will confirm your slot within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            {/* Progress Stepper */}
            <div className="flex items-center mb-8">
              {[
                { n: 1, label: 'Personal Info' },
                { n: 2, label: 'Appointment' },
                { n: 3, label: 'Review' },
              ].map(({ n, label }, i) => (
                <React.Fragment key={n}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
                      ${step === n ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' :
                        step > n ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {step > n ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      ) : n}
                    </div>
                    <span className={`text-xs mt-1.5 font-medium ${step >= n ? 'text-gray-700' : 'text-gray-400'}`}>{label}</span>
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${step > n ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                    Your Information
                  </h2>

                  {/* Existing / New Patient */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Are you an existing patient?</label>
                    <div className="flex gap-4">
                      {['yes', 'no'].map(val => (
                        <label key={val} className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                          ${form.isExisting === val ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input type="radio" name="isExisting" value={val} checked={form.isExisting === val} onChange={set('isExisting')} className="accent-blue-600" />
                          <span className="font-medium text-gray-700 capitalize">{val === 'yes' ? 'Yes, I\'m existing' : 'No, I\'m new'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {form.isExisting === 'yes' && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Patient Code <span className="text-red-500">*</span></label>
                      <input className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition font-mono ${errors.patientCode ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        placeholder="e.g. P-0042"
                        value={form.patientCode}
                        onChange={set('patientCode')}
                      />
                      {errors.patientCode && <p className="text-red-500 text-xs mt-1">{errors.patientCode}</p>}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        placeholder="e.g. Priya Sharma"
                        value={form.fullName}
                        onChange={set('fullName')}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                      <input className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={set('phone')}
                        type="tel"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        placeholder="priya@example.com"
                        value={form.email}
                        onChange={set('email')}
                        type="email"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth</label>
                      <input className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                        type="date"
                        value={form.dob}
                        onChange={set('dob')}
                        max={today}
                      />
                    </div>
                  </div>

                  <button type="button" onClick={nextStep}
                    className="mt-6 w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                    Continue
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}

              {/* Step 2: Appointment Details */}
              {step === 2 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                    Appointment Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department / Speciality <span className="text-red-500">*</span></label>
                      <select className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition bg-white ${errors.department ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        value={form.department}
                        onChange={set('department')}
                      >
                        <option value="">Select a department</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date <span className="text-red-500">*</span></label>
                      <input className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition ${errors.preferredDate ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        type="date"
                        min={today}
                        value={form.preferredDate}
                        onChange={set('preferredDate')}
                      />
                      {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time Slot <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map(slot => (
                          <button key={slot} type="button"
                            onClick={() => setForm(p => ({ ...p, preferredTime: slot }))}
                            className={`py-2 px-1 text-xs font-semibold rounded-lg border-2 transition
                              ${form.preferredTime === slot
                                ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                                : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50'}`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                      {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reason / Chief Complaint</label>
                      <textarea className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition resize-none"
                        rows={3}
                        placeholder="Briefly describe your symptoms or reason for visiting..."
                        value={form.reason}
                        onChange={set('reason')}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setStep(1)}
                      className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                      Back
                    </button>
                    <button type="button" onClick={nextStep}
                      className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                      Review Appointment
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Confirm */}
              {step === 3 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                    Review & Confirm
                  </h2>

                  <div className="space-y-4 mb-6">
                    {/* Personal */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Personal Info</h3>
                        <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-600 font-semibold hover:text-blue-700">Edit</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><span className="text-gray-400">Name</span><p className="font-semibold text-gray-800">{form.fullName}</p></div>
                        <div><span className="text-gray-400">Phone</span><p className="font-semibold text-gray-800">{form.phone}</p></div>
                        <div><span className="text-gray-400">Email</span><p className="font-semibold text-gray-800">{form.email}</p></div>
                        {form.dob && <div><span className="text-gray-400">Date of Birth</span><p className="font-semibold text-gray-800">{form.dob}</p></div>}
                        {form.isExisting === 'yes' && form.patientCode && (
                          <div><span className="text-gray-400">Patient Code</span><p className="font-semibold text-gray-800 font-mono">{form.patientCode}</p></div>
                        )}
                      </div>
                    </div>

                    {/* Appointment */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">Appointment</h3>
                        <button type="button" onClick={() => setStep(2)} className="text-xs text-blue-600 font-semibold hover:text-blue-700">Edit</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><span className="text-blue-400">Department</span><p className="font-bold text-gray-800">{form.department}</p></div>
                        <div><span className="text-blue-400">Time Slot</span><p className="font-bold text-gray-800">{form.preferredTime}</p></div>
                        <div className="col-span-2"><span className="text-blue-400">Date</span><p className="font-bold text-gray-800">{form.preferredDate ? new Date(form.preferredDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</p></div>
                        {form.reason && <div className="col-span-2"><span className="text-blue-400">Reason</span><p className="font-semibold text-gray-800">{form.reason}</p></div>}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-4 text-center">
                    By confirming, you agree that our reception team will contact you to finalize the appointment.
                  </p>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)}
                      className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                      Back
                    </button>
                    <button type="submit"
                      className="flex-1 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Confirm Appointment Request
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Emergency */}
            <div className="bg-red-600 text-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5C2.3 17.333 3.262 19 4.802 19z" /></svg>
                <span className="font-bold text-sm">Emergency?</span>
              </div>
              <p className="text-red-100 text-xs mb-3">Don't wait — call us directly for emergencies.</p>
              <a href="tel:+912025678911" className="block w-full py-2 bg-white text-red-600 font-bold text-center rounded-lg text-sm hover:bg-red-50 transition">
                +91-20-2567-8911
              </a>
            </div>

            {/* OPD Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                OPD Hours
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Mon – Fri', '8:00 AM – 8:00 PM'],
                  ['Saturday', '8:00 AM – 6:00 PM'],
                  ['Sunday', '9:00 AM – 1:00 PM'],
                  ['Emergency', '24 / 7'],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-500">{day}</span>
                    <span className={`font-semibold ${day === 'Emergency' ? 'text-green-600' : 'text-gray-800'}`}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments quick list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                Departments
              </h3>
              <div className="space-y-1.5">
                {DEPARTMENTS.slice(0, -1).map(d => (
                  <button key={d} type="button"
                    onClick={() => { setForm(p => ({ ...p, department: d })); if (step !== 2) setStep(step === 1 ? 1 : 2) }}
                    className="block w-full text-left text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition">
                    → {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Find Us
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                123 Medical Center Drive<br />
                Healthcare District<br />
                Pune, Maharashtra 411001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
