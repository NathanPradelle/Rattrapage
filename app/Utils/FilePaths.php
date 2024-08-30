<?php

namespace App\Utils;

class FilePaths
{
    /* Unauthenticated */
    const WELCOME = 'Unauthenticated/Welcome/Welcome';
    const LOGIN = "Unauthenticated/Login/Login";
    const REGISTER = "Unauthenticated/Register/Register";
    const CALENDAR = "Unauthenticated/CalendarPage/CalendarPage";

    /* Authenticated */
    const CONFIRM_PASSWORD = "Authenticated/ConfirmPassword/ConfirmPassword";
    const DASHBOARD = "Authenticated/Dashboard/Dashboard";
    const FORGOT_PASSWORD = "Authenticated/ForgotPassword/ForgotPassword";
    const PROFILE = "Authenticated/Profile/ProfileEditionPage";
    const RESET_PASSWORD = "Authenticated/ResetPassword/ResetPassword";
    const VERIFY_EMAIL = "Authenticated/VerifyEmail/VerifyEmail";
    const CONTACT = "Authenticated/Contact/Contact";
    const TICKET_CREATION = "Authenticated/TicketCreationPage/TicketCreationPage";
    const TICKET_INDEX = "Authenticated/TicketIndex/TicketIndex";
    const TICKET_SHOW = "Authenticated/TicketShow/TicketShow";

    const CHATS = "ChatsPage/ChatsPage";
    const CHAT = "ChatPage/ChatPage";

    /* Admin */
    const CUSTOMERS = 'Admin/CustomersPage/CustomersPage';
    const VOLUNTEERS = 'Admin/VolunteersPage/VolunteersPage';
    const ADMINS = 'Admin/AdminsPage/AdminsPage';
    const USER = 'Admin/UserPage/UserPage';

    const ADMIN_CREATION = 'Admin/AdminCreationPage/AdminCreationPage';
    const ADMINS_PAGE = 'Admin/AdminsPage/AdminsPage';
    const TAG_CREATION = 'Admin/TagCreationPage/TagCreationPage';
    const TAG_EDITION = 'Admin/TagEditionPage/TagEditionPage';
    const TAGS = 'Admin/TagsPage/TagsPage';

    const SERVICES = "Admin/ServicesPage/ServicesPage";
    const SERVICE_CREATE = "Admin/ServiceCreationPage/ServiceCreationPage";

    const TOURS = "ToursPage/ToursPage";
    const TOUR = "TourPage/TourPage";
    const TOUR_CREATION = "TourCreationPage/TourCreationPage";

    const PAYMENT = 'Traveler/PaymentPage/PaymentPage';

    /* Provider */
    const SERVICE_FEE = "Provider/ServiceFeePage/ServiceFeePage";
    const SERVICE_ADD_PROVIDER = "Provider/AddProviderPage/AddProviderPage";
    const MY_SERVICES = "Provider/MyServicesPage/MyServicesPage";
}
