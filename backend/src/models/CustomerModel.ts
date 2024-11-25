import { PrismaClient, Driver, Customer } from '@prisma/client';

const prisma = new PrismaClient();

class CustomerModel {
  async getByCustomerId(customerId: string): Promise<Customer | null> {
    return await prisma.customer.findUnique({ where: { customer_id: customerId } });
  }

  async getById(id: number): Promise<Customer | null> {
    return await prisma.customer.findUnique({ where: { id: id } });
  }

  async getAll(): Promise<Driver[]> {
    return await prisma.driver.findMany();
  }

  async create(customerId: string) {
    return await prisma.customer.create({ data: { customer_id: customerId } });
  }
}

export default new CustomerModel();
