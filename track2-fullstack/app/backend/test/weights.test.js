const request = require('supertest');
process.env.FARMTRACKER_DB_PATH = ':memory:';
const app = require('../server');
const { initDb } = require('../db');

beforeAll(() => {
  initDb();
});

let animalId;

beforeEach(async () => {
  // Create a paddock and an animal to test against
  const paddockRes = await request(app)
    .post('/api/paddocks')
    .send({ name: `Paddock-${Date.now()}`, capacity: 10 });
  const animalRes = await request(app)
    .post('/api/animals')
    .send({ name: 'TestSheep', tag_number: `T-${Date.now()}`, paddock_id: paddockRes.body.id });
  animalId = animalRes.body.id;
});

describe('POST /api/animals/:id/weights', () => {
  it('creates a weight record and returns 201', async () => {
    const res = await request(app)
      .post(`/api/animals/${animalId}/weights`)
      .send({ weight_kg: 45.2, date: '2024-11-15', notes: 'Post-shearing' });
    expect(res.status).toBe(201);
    expect(res.body.weight_kg).toBe(45.2);
    expect(res.body.date).toBe('2024-11-15');
    expect(res.body.animal_id).toBe(animalId);
  });

  it('returns 422 if weight_kg is missing', async () => {
    const res = await request(app)
      .post(`/api/animals/${animalId}/weights`)
      .send({ date: '2024-11-15' });
    expect(res.status).toBe(422);
  });

  it('returns 422 if weight_kg is zero', async () => {
    const res = await request(app)
      .post(`/api/animals/${animalId}/weights`)
      .send({ weight_kg: 0, date: '2024-11-15' });
    expect(res.status).toBe(422);
  });

  it('returns 422 if weight_kg is negative', async () => {
    const res = await request(app)
      .post(`/api/animals/${animalId}/weights`)
      .send({ weight_kg: -10, date: '2024-11-15' });
    expect(res.status).toBe(422);
  });

  it('returns 404 if animal does not exist', async () => {
    const res = await request(app)
      .post('/api/animals/99999/weights')
      .send({ weight_kg: 45.2, date: '2024-11-15' });
    expect(res.status).toBe(404);
  });
});

describe('GET /api/animals/:id/weights', () => {
  it('returns weights ordered by date descending', async () => {
    await request(app).post(`/api/animals/${animalId}/weights`).send({ weight_kg: 40, date: '2024-10-01' });
    await request(app).post(`/api/animals/${animalId}/weights`).send({ weight_kg: 45, date: '2024-11-15' });
    await request(app).post(`/api/animals/${animalId}/weights`).send({ weight_kg: 42, date: '2024-10-20' });

    const res = await request(app).get(`/api/animals/${animalId}/weights`);
    expect(res.status).toBe(200);
    expect(res.body[0].date).toBe('2024-11-15');
    expect(res.body[1].date).toBe('2024-10-20');
    expect(res.body[2].date).toBe('2024-10-01');
  });

  it('returns 404 if animal does not exist', async () => {
    const res = await request(app).get('/api/animals/99999/weights');
    expect(res.status).toBe(404);
  });

  it('returns empty array if no weights logged', async () => {
    const res = await request(app).get(`/api/animals/${animalId}/weights`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});