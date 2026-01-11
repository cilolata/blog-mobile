export const getAllProfiles = async ({
  page,
}: {
  page: number;
}): Promise<any> => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/users?page=${page}&limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    throw error;
  }
};

export const getProfileById = async (id?: number | string) => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfile = async (id: any) => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/user/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (userId: any, data: any) => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/user/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dataJson = await response.json();
    return { data: dataJson, status: response.status };
  } catch (error) {
    throw error;
  }
};
