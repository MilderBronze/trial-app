import { apiConnector } from "../apiconnector";

export async function getAverageRating(courseId) {
  try {
    const response = await apiConnector("POST", "/course/getAverageRating", {
      courseId,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data.averageRating;
  } catch (error) {
    return error.message;
  }
}
