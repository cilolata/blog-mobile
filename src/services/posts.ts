export const getAllPosts = async ({ page }: { page: number }): Promise<any> => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/posts?page=${page}&limit=10`,
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

export const getPostById = async (id?: number | string) => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/posts/${id}`,
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

export const searchPost = async (search?: string) => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/posts?search=${search}`,
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

export const postNewPost = async (data: any) => {
  try {
    const response = await fetch(`https://postai-latest.onrender.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const putPost = async (postId: any, data: any) => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/posts/${postId}`,
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
    const newData = await response.json();
    return newData;
  } catch (error) {
    throw error;
  }
};

export const deletePostById = async (id: any): Promise<any> => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/posts/${id}`,
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

    const data = await response.json();
    return {status: data.status ?? 200}
  } catch (error) {
    throw error;
  }
};

export const getLogin = async (dataLogin: any) => {
  try {
    const response = await fetch(`https://postai-latest.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataLogin),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    throw error;
  }
};

export const getRegister = async (newUser: any) => {
  try {
    const response = await fetch(
      `https://postai-latest.onrender.com/cadastrar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newUser),
      }
    );

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    throw error;
  }
};
