import http from "../api/http";
export const getList = async (type: string) => {
  const res = await http.get(
    `https://ruankaokao.com/api/knowledge/list/${type}`
  );
  console.log(res, "resssss");
  if (res.code === 200) return res.data;
  return [];
};

export const getSubList = async (id: string) => {
  const res = await http.get(`https://ruankaokao.com/api/chapter/list`, {
    Knowledge: id,
  });
  if (res.code === 200) return res.data;
  return [];
};
