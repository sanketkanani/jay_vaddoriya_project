import axiosInstance from "./config/ApiConfig";

const GET_TESTIMONIAL_URL = "/website-management/testimonials/"
const GET_MENTORS_URL = "/website-management/mentors/";
const CREATE_CONTACT_URL = "/crm/create-contact/";
const GET_PLACEMENT_STORY_COMENT = '/website-management/placement_story_comments';
const GET_PLACEMENT_STORY_VIDEO = '/website-management/placement_story_videos';
const GET_MEDIA_COVERAGE = '/website-management/media_coverage';
const GET_GALLERY = '/website-management/gallery';

export const GetTestimonials = async () => {
    try {
        const response = await axiosInstance.get(GET_TESTIMONIAL_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetPlacementComment = async () => {
    try {
        const response = await axiosInstance.get(GET_PLACEMENT_STORY_COMENT);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetPlacementVideos = async () => {
    try {
        const response = await axiosInstance.get(GET_PLACEMENT_STORY_VIDEO);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetMediaCoverage = async () => {
    try {
        const response = await axiosInstance.get(GET_MEDIA_COVERAGE);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const GetGallery = async () => {
    try {
        const response = await axiosInstance.get(GET_GALLERY);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const GetMentors = async () => {
    try {
        const response = await axiosInstance.get(GET_MENTORS_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const CreateContact = async (payload) => {
    try {
        const formDataPayload = new FormData();
        formDataPayload.append('name', payload.name);
        formDataPayload.append('phone_number', payload.phone);
        formDataPayload.append('email', payload.email);
        formDataPayload.append('location', payload.location);
        formDataPayload.append('university', payload.university);

        // Send formDataPayload instead of raw payload
        const response = await axiosInstance.post(CREATE_CONTACT_URL, formDataPayload, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for FormData handling
            },
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}