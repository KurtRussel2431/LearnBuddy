import { supabase, formActionDefault } from '@/utils/supabase.js'
import { ref } from 'vue'

export function useTutorRegister() {
  const formDataDefault = {
    name: '',
    program: '',
    role: 'Student',
    email: '',
    password: '',
    contact: '',
    subjects: [],
  }

  const formData = ref({ ...formDataDefault })
  const formAction = ref({ ...formActionDefault })
  const refVForm = ref()

  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      // Create an auth user immediately but mark as not approved/usable
      // When a user applies via the tutor registration form we always mark the
      // auth user metadata as a tutor (is_tutor=true). The form still allows
      // selecting 'Student' or 'Teacher' to indicate their existing account type.
      const { data: signData, error: signError } = await supabase.auth.signUp({
        email: formData.value.email,
        password: formData.value.password,
        options: {
          data: {
            name: formData.value.name,
            program: formData.value.program,
            role: 'tutor',
            contact: formData.value.contact,
            approved: false,
            is_tutor: true,
          },
        },
      })

      if (signError) {
        formAction.value.formErrorMessage = signError.message
        formAction.value.formStatus = signError.status || 400
        formAction.value.formProcess = false
        return
      }

      const userId = signData?.user?.id ?? null

      const payload = {
        user_id: userId,
        name: formData.value.name,
        program: formData.value.program,
        role: 'tutor',
        account_role: formData.value.role, // preserves chosen Student/Teacher
        contact: formData.value.contact,
        subjects: formData.value.subjects,
        requires_interview: false,
        status: 'pending',
      }

      // Try inserting the application. If the DB schema doesn't include
      // `account_role`, retry without it to remain compatible with older schemas.
      let { data, error } = await supabase.from('tutor_applications').insert([payload])

      if (error) {
        const msg = error.message || ''
        if (msg.toLowerCase().includes('account_role') || msg.toLowerCase().includes("column \"account_role\"")) {
          // remove the field and retry
          delete payload.account_role
          const retry = await supabase.from('tutor_applications').insert([payload])
          data = retry.data
          error = retry.error
        }
      }

      if (error) {
        formAction.value.formErrorMessage = error.message
        formAction.value.formStatus = error.status || 500
      } else {
        formAction.value.formSuccessMessage =
          'Account created and application submitted — awaiting admin approval.'
      }
    } catch (err) {
      formAction.value.formErrorMessage = err.message || 'Submission failed.'
    }

    formAction.value.formProcess = false
    refVForm.value?.reset()
  }

  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
      if (valid) onSubmit()
    })
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
