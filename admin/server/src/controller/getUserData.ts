import { Response, Request } from 'express'

export const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const accessToken = req.query.accessToken;

    const response = await fetch(`${process.env.URL_CLIENT}/api/get-all-user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    console.log(response)

    const data = await response.json();

    if (!data) {
      res.status(404).send();
    }

    res.status(201).json({ message: 'Get All user Successful', data: data })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
} 