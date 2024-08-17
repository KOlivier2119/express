import { Router } from "express";
const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookies);
  console.log(req.cookies);
  console.log(req.signedCookies.hello)

  if (req.signedCookies.hello && req.signedCookies.hello === "World") return res.send("Products");

  return res.send({
    msg: "Sorry you need a correct cookie",
  });
});

export default router;
