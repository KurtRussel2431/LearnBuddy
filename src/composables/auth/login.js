import { formActionDefault, supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Admin credentials
const ADMIN_EMAIL = 'Admin@learningbuddy.com'
const ADMIN_PASSWORD = 'Admin1234'

// by convention, composable function names start with "use"
export function useLogin() {
  // Utilize pre-defined vue functions
  const router = useRouter()

  // Load Variables
  const formDataDefault = {
    email: '',
    password: '',
  }
  const formData = ref({
    ...formDataDefault,
  })
  const formAction = ref({
    ...formActionDefault,
  })
  const refVForm = ref()

  const onSubmit = async () => {
    // Reset Form Action utils; Turn on processing at the same time
    formAction.value = { ...formActionDefault, formProcess: true }

    // Check if email matches admin credentials
    if (formData.value.email === ADMIN_EMAIL) {
      if (formData.value.password === ADMIN_PASSWORD) {
        // Create admin session
        const adminSession = {
          user: {
            id: 'admin-user',
            email: 'Admin@learningbuddy.com',
            user_metadata: {
              role: 'admin',
            },
          },
        }
        // Store in localStorage for admin session
        localStorage.setItem('adminSession', JSON.stringify(adminSession))
        formAction.value.formSuccessMessage = 'Successfully logged in as Admin.'
        router.replace('/admin')
      } else {
        formAction.value.formErrorMessage = 'Invalid admin credentials.'
        formAction.value.formStatus = 401
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.value.email,
        password: formData.value.password,
      })

      if (error) {
        // Add Error Message and Status Code
        formAction.value.formErrorMessage = error.message
        formAction.value.formStatus = error.status
      } else if (data) {
        // Add Success Message
        formAction.value.formSuccessMessage = 'Successfully Logged Account.'
        // Redirect Acct to Dashboard
        router.replace('/dashboard')
      }
    }

    // Reset Form
    refVForm.value?.reset()
    // Turn off processing
    formAction.value.formProcess = false
  }

  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
      if (valid) onSubmit()
    })
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
