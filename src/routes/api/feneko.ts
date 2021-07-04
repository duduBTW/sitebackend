import { Response, Router } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import FenekoTag, { IFenekoTag } from "../../models/Feneko/Tags";
import FenekoTipoPedido, {
  IFenekoTipoPedido,
} from "../../models/Feneko/TipoPedido";
import Feneko, { IFeneko } from "../../models/Feneko/Feneko";
import updatedFields from "../../shared/props";
import Request from "../../types/Request";
import FenekoArt, { IFenekoArte } from "../../models/Feneko/Art";

const router: Router = Router();

router.get("/itemPedido", async (req: Request, res: Response) => {
  try {
    const fenekoTipoPedodp: IFenekoTipoPedido[] = await FenekoTipoPedido.find();

    res.status(200).json(fenekoTipoPedodp);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/itemPedido/:id", async (req: Request, res: Response) => {
  try {
    const fenekoTipoPedodp: IFenekoTipoPedido = await FenekoTipoPedido.findById(
      req.params.id
    );

    res.status(200).json(fenekoTipoPedodp);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.put("/itemPedido/:id", async (req: Request, res: Response) => {
  try {
    await FenekoTipoPedido.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.delete("/itemPedido/:id", async (req: Request, res: Response) => {
  try {
    await FenekoTipoPedido.deleteOne({
      _id: req.params.id,
    });

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post(
  "/itemPedido",
  [
    check("types", "titleEn obrigatorio").exists().isArray(),
    check("titleEn", "titleEn obrigatorio").exists().isString(),
    check("titlePt", "titlePt obrigatorio").exists().isString(),
    check("descPt", "titleEn obrigatorio").exists().isString(),
    check("descEn", "titleEn obrigatorio").exists().isString(),
    check("image", "image obrigatorio").optional().isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    try {
      const newFenekoPedido = new FenekoTipoPedido(req.body);
      const { _id } = await newFenekoPedido.save();

      res.status(200).json({ id: _id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/tags", async (req: Request, res: Response) => {
  try {
    const fenekoTag: IFenekoTag[] = await FenekoTag.find();

    res.status(200).json(fenekoTag);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/tags/:id", async (req: Request, res: Response) => {
  try {
    const fenekoTag: IFenekoTag = await FenekoTag.findById(req.params.id);

    res.status(200).json(fenekoTag);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.put("/tags/:id", async (req: Request, res: Response) => {
  try {
    await FenekoTag.updateOne({ _id: req.params.id }, req.body);

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.delete("/tags/:id", async (req: Request, res: Response) => {
  try {
    await FenekoTag.deleteOne({ _id: req.params.id });

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post(
  "/tags",
  [
    check("tituloPt", "tituloPt obrigatorio"),
    check("tituloEn", "tituloEn obrigatorio"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    try {
      const newFenekoTag = new FenekoTag(req.body);
      const { _id } = await newFenekoTag.save();

      res.status(200).json({ id: _id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/artist", async (req: Request, res: Response) => {
  try {
    const feneko: IFeneko[] = await Feneko.find();

    res.status(200).json(feneko);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.delete("/artist/:id", async (req: Request, res: Response) => {
  try {
    await Feneko.deleteOne({
      _id: req.params.id,
    });

    var artsToDelete = await FenekoArt.find({
      artist: req.params.id,
    });

    for (let i = 0; i < artsToDelete.length; i++) {
      await FenekoArt.deleteOne({
        _id: artsToDelete[i]._id,
      });
    }

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/artist/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, _id, descEn, descPt, profilePic, types }: IFeneko =
      await Feneko.findById(id);

    res.status(200).json({
      nome: name,
      id: _id,
      descricaoEn: descEn,
      descricaoPt: descPt,
      foto_de_perfil: profilePic,
      types: types,
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.put("/artist/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`body`, body);

  try {
    const { result: editData } = updatedFields<IFeneko, any>(
      [
        {
          back: "descEn",
          front: "descricaoEn",
        },
        {
          back: "descPt",
          front: "descricaoPt",
        },
        {
          back: "profilePic",
          front: "foto_de_perfil",
        },
        {
          back: "name",
          front: "nome",
        },
        {
          back: "types",
          front: "types",
        },
      ],
      body
    );

    console.log(`editData`, editData);

    const result = await Feneko.updateOne(
      {
        _id: id,
      },
      editData
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post(
  "/artist",
  [
    check("nome", "Campo nome é obrigatório").exists().isString(),
    // check("tags", "Tags deve ser um array de strings").isArray(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { body } = req;

    try {
      const artist = new Feneko({
        name: body.nome,
        descEn: body.descricaoEn,
        descPt: body.descricaoPt,
        tags: body.tags,
        profilePic: body.foto_de_perfil,
        types: body.types,
      });

      var result = await artist.save();

      res.json({ id: result.id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/artist/art/:id", async (req: Request, res: Response) => {
  try {
    const arts: IFenekoArte[] = await FenekoArt.find({
      artist: req.params.id,
    });

    res.status(200).json(arts);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/artist/art/:id/:idart", async (req: Request, res: Response) => {
  try {
    const art: IFenekoArte = await FenekoArt.findById(req.params.idart);

    res.status(200).json(art);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.put("/artist/art/:id/:idart", async (req: Request, res: Response) => {
  try {
    await FenekoArt.updateOne(
      {
        _id: req.params.idart,
        artist: req.params.id,
      },
      req.body
    );

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.delete("/artist/art/:id/:idart", async (req: Request, res: Response) => {
  try {
    await FenekoArt.deleteOne({
      _id: req.params.idart,
      artist: req.params.id,
    });

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post(
  "/artist/art/:id",
  [
    check("type", "type required"),
    check("url", "url required"),
    check("title", "title required"),
    check("ratio", "ratio required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const newArte = new FenekoArt({ artist: req.params.id, ...req.body });

      const { _id } = await newArte.save();

      res.status(200).json({ id: _id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

export default router;
