# LearningBuddy Admin Dashboard

## Overview

The Admin Dashboard is a comprehensive management interface for LearningBuddy administrators. It allows you to manage tutees, tutors, and tutor registration requests.

## Admin Login

### Credentials

- **Email:** `Admin@learningbuddy.com`
- **Password:** `Admin1234`

### How to Login as Admin

1. Navigate to the login page (`/`)
2. Enter the email: `Admin@learningbuddy.com`
3. Enter the password: `Admin1234`
4. Click the **Login** button
5. The system will automatically detect it's an admin login and redirect you to the Admin Dashboard (`/admin`)

## Admin Dashboard Features

### Three Main Sections (Tabs)

#### 1. **Tutees Tab**

Manage all registered tutees (students) in the system.

**Features:**

- View all tutees in a data table format
- Search functionality (by email or name)
- See registration dates
- Delete tutees (with confirmation)
- Refresh data button

**Visible Columns:**

- Email
- Full Name
- Registration Date
- Actions

#### 2. **Tutors Tab**

Manage all approved tutors in the system.

**Features:**

- View all approved tutors
- Search functionality (by email or name)
- See program and subjects each tutor teaches
- View registration/approval date
- Delete tutors (with confirmation)
- Refresh data button

**Visible Columns:**

- Email
- Full Name
- Program
- Subjects (displayed as chips)
- Registration Date
- Actions

#### 3. **Tutor Requests Tab**

Manage pending tutor registration requests.

**Features:**

- View all pending tutor registration requests
- Search functionality (by email or name)
- Approve/Reject registration requests
- See request submission date
- Subjects each applicant wants to teach

**Actions Available:**

- ✓ **Approve** - Accept tutor registration
- ✗ **Reject** - Decline tutor registration (with confirmation)

**Visible Columns:**

- Email
- Full Name
- Program
- Subjects (displayed as chips)
- Request Date
- Actions (Approve/Reject buttons)

## Navigation

### From Admin Dashboard

- **Settings Icon (Gear)** - Access account settings
- **Logout Icon** - Sign out of admin account
- **Profile Menu** - Access user profile and additional options

### Navigation Bar

When logged in as an admin, the main navigation shows:

- **Admin Dashboard** - Returns to admin dashboard

## Search Functionality

All three tabs include search functionality:

- **Real-time filtering** as you type
- Search by **email** or **full name**
- Case-insensitive matching

## Data Management

### Tutees Management

- **Delete**: Removes a tutee account from the system
- Confirmation required before deletion
- All tutee data will be removed

### Tutors Management

- **Delete**: Removes an approved tutor from the system
- Confirmation required before deletion
- Only shows approved tutors

### Tutor Requests Management

- **Approve**: Moves a pending tutor to approved status (allow them to tutor)
- **Reject**: Removes a rejected tutor application

## Tips & Best Practices

1. **Regular Monitoring**: Regularly check the Tutor Requests tab to process new applications
2. **Search Before Deleting**: Always verify you have the correct user before deletion
3. **Review Information**: Check program and subjects before approving tutors
4. **Refresh Data**: Use the refresh button to get the latest data without reloading the page
5. **Logout Properly**: Always use the logout button to ensure session is properly closed

## User Roles in LearningBuddy

The system supports three user types:

1. **Admin** - Can manage users and requests
2. **Tutor** - Can teach and manage sessions
3. **Tutee** - Can book sessions and learn

## Troubleshooting

### Can't Login as Admin

- Ensure you're entering `Admin@learningbuddy.com` as the email
- Double-check password: `Admin1234`
- The system automatically detects admin login when the email matches
- Clear browser cache and try again

### Data Not Loading

- Click the **Refresh** button in the tab
- Check your internet connection
- Ensure the database is accessible

### Buttons Not Working

- The buttons may be processing - wait a moment
- Refresh the page and try again

## Security Notes

⚠️ **Important:**

- The admin credentials are currently hardcoded for development
- In production, implement proper admin authentication with database
- Never share admin credentials
- Consider changing admin credentials in the deployment
- Implement additional security measures as needed

## Database Requirements

The admin dashboard requires the following table structure:

**profiles table:**

```
- id (UUID)
- email (TEXT)
- full_name (TEXT)
- role (TEXT) - 'admin', 'tutor', 'tutee'
- program (TEXT)
- subjects (ARRAY or JSON)
- is_approved (BOOLEAN)
- created_at (TIMESTAMP)
- [other fields as needed]
```

## Support

For issues or feature requests, contact your development team.
