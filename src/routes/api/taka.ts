import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";

import Request from "../../types/Request";

import {
  ITakaTag,
  TakaTag,
  TakaSubTag,
  ITakaSubTag,
  TakaArt,
  ITakaArt,
  TakaUser,
} from "../../models/Taka";
import { TakaContract } from "../../models/Taka";

const router: Router = Router();

// Arts
// List All
router.get(
  "/tags/subtags/art/:idsubtag",
  async (req: Request, res: Response) => {
    const { idsubtag } = req.params;

    try {
      const takaArts: ITakaArt[] = await TakaArt.find({
        subtag: idsubtag,
      });

      res.status(200).json(takaArts);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// Get one
router.get(
  "/tags/subtags/art/:idsubtag/:idart",
  async (req: Request, res: Response) => {
    const { idart } = req.params;

    try {
      const takaArt: ITakaArt = await TakaArt.findById(idart);

      res.status(200).json(takaArt);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// Edit one
router.put(
  "/tags/subtags/art/:idsubtag/:idart",
  async (req: Request, res: Response) => {
    const { idart } = req.params;

    try {
      const result = await TakaArt.updateOne(
        {
          _id: idart,
        },
        req.body
      );

      res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// Delete
router.delete(
  "/tags/subtags/art/:idsubtag/:idart",
  async (req: Request, res: Response) => {
    const { idart, idsubtag } = req.params;

    try {
      await TakaArt.deleteOne({
        _id: idart,
        subtag: idsubtag,
      });

      res.status(200).send();
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// Create Art
router.post(
  "/tags/subtags/art/:idsubtag",
  [check("url", "URL é obrigatorio").exists().isString()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { idsubtag } = req.params;
    const { body } = req;

    try {
      var newArt = new TakaArt({
        subtag: idsubtag,
        ...body,
      });

      const { _id } = await newArt.save();

      res.status(200).json({ id: _id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// SubTags
router.get(
  "/tags/subtags/:idtag/:idsubtag",
  async (req: Request, res: Response) => {
    const { idtag, idsubtag } = req.params;

    try {
      const takaSubTag: ITakaSubTag = await TakaSubTag.findById(idsubtag);

      res.status(200).json(takaSubTag);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.delete(
  "/tags/subtags/:idtag/:idsubtag",
  async (req: Request, res: Response) => {
    const { idtag, idsubtag } = req.params;

    try {
      await TakaSubTag.deleteOne({ _id: idsubtag, tag: idtag });

      res.status(200).send();
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/tags/subtags/:idtag", async (req: Request, res: Response) => {
  const { idtag } = req.params;

  try {
    const takaSubTags: ITakaSubTag[] = await TakaSubTag.find({
      tag: idtag,
    });

    res.status(200).json(takaSubTags);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.put(
  "/tags/subtags/:idtag/:idsubtag",
  async (req: Request, res: Response) => {
    const { idtag, idsubtag } = req.params;

    console.log(`req.body`, {
      tag: idtag,
      _id: idsubtag,
    });
    console.log(`req.body`, req.body);

    try {
      await TakaSubTag.updateOne(
        {
          tag: idtag,
          _id: idsubtag,
        },
        req.body
      );

      res.status(200).send();
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.post(
  "/tags/subtags/:idtag",
  [
    check("titulo", "Titulo nome é obrigatório").exists().isString(),
    check("descricao", "Descrição nome é obrigatória").exists().isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { body } = req;
    const { idtag } = req.params;

    try {
      const subtag = new TakaSubTag({
        tag: idtag,
        ...body,
      });

      const { _id } = await subtag.save();

      res.status(200).json({ id: _id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// Tags
router.get("/tags", async (_: Request, res: Response) => {
  try {
    const takaTags: ITakaTag[] = await TakaTag.find();

    res.status(200).json(takaTags);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/tags/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { _id, titulo }: ITakaTag = await TakaTag.findById(id);

    res.status(200).json({ id: _id, titulo });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/tags/:id/all", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let result: any[] = [];
    const subTags: ITakaSubTag[] = await TakaSubTag.find({
      tag: id,
    });

    for (let i = 0; i < subTags.length; i++) {
      const element = subTags[i];

      const art: ITakaArt[] = await TakaArt.find({
        subtag: element._id,
      });
      result = [
        ...result,
        {
          tag: element,
          art,
        },
      ];
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/tags/:id/one", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subTag: ITakaSubTag = await TakaSubTag.findById(id);

    const art: ITakaArt[] = await TakaArt.find({
      subtag: subTag._id,
    });

    res.status(200).json({
      subTag,
      art,
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/commissions", async (req: Request, res: Response) => {
  try {
    let result: any[] = [];
    const takaTags: ITakaTag[] = await TakaTag.find();

    console.log(`takaTags`, takaTags);
    for (let iTag = 0; iTag < takaTags.length; iTag++) {
      const tag = takaTags[iTag];
      let subTags: ITakaSubTag[] = await TakaSubTag.find({
        tag: tag._id,
      });

      let newSubTags: any[] = [];
      for (let iSubTag = 0; iSubTag < subTags.length; iSubTag++) {
        const subTag = subTags[iSubTag];

        const art: ITakaArt[] = await TakaArt.find({
          subtag: subTag._id,
        });

        newSubTags = [
          ...newSubTags,
          {
            id: subTags[iSubTag]._id,
            titulo: subTags[iSubTag].titulo,
            descricao: subTags[iSubTag].descricao,
            preco: subTags[iSubTag].preco,
            art: art,
          },
        ];
      }
      console.log(`newSubTags`, newSubTags);

      result = [
        ...result,
        {
          tag: { titulo: tag.titulo, id: tag._id },
          subTags: newSubTags,
        },
      ];
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.delete("/tags/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await TakaTag.deleteOne({ _id: id });

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post(
  "/tags",
  [check("titulo", "Titlo obrigatório").exists().isString()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { body } = req;
    try {
      const tag = new TakaTag({
        titulo: body.titulo,
      });

      var { _id } = await tag.save();
      res.status(200).json({ id: _id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.put("/tags/:id", async (req: Request, res: Response) => {
  try {
    const result = await TakaTag.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post(
  "/contract",
  [check("term", "term obrigatório").exists().isString()],
  [check("termEn", "termEn obrigatório").exists().isString()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ errors: errors.array() });
      }

      const newContract = new TakaContract({
        term: req.body.term,
        termEn: req.body.termEn,
        dateCreated: new Date(),
      });

      const { _id } = await newContract.save();

      res.status(200).json({ id: _id });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/contract", async (req: Request, res: Response) => {
  try {
    const data = await TakaContract.find({}, "dateCreated").sort({
      dateCreated: -1,
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/contract/:id", async (req: Request, res: Response) => {
  try {
    const data = await TakaContract.findById(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/user", async (req: Request, res: Response) => {
  try {
    const data = await TakaUser.find();

    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const data = await TakaUser.findById(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
