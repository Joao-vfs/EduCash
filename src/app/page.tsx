import { Button, Text } from "@/components";
import { ROUTES } from "@/constants/routes/routes";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-around flex-col px-4 sm:px-6 md:px-8 py-6 sm:py-10 gap-6 sm:gap-8 lg:flex-row-reverse lg:justify-center lg:gap-16 lg:px-12">
      <Image
        src="/image-home.png"
        alt="Imagem de home"
        width={345}
        height={373}
        className="w-full h-auto lg:w-auto lg:h-[calc(100vh-5rem)] lg:rotate-90"
      />
      <div className="flex flex-col items-start justify-start gap-3 sm:gap-4 w-full lg:w-1/2 lg:max-w-md">
          <Image src="/logo.svg" alt="Logo" width={142} height={73} className="hidden lg:block mb-10">
          </Image>

        <Text weight="bold" as="h1" className="text-2xl! lg:text-5xl!">
          Eduque suas finanças agora
        </Text>
        <Text variant="caption" weight="normal" as="p" className="text-base lg:text-lg">
          Controle seus gastos, aprenda a investir e evolua com seus colegas.
        </Text>
        <Button variant="test" className="my-10 w-full">
          <Link href={ROUTES.LOGIN} className="text-2xl">
            Iniciar Agora
          </Link>
        </Button>
      </div>
    </div>
  );
}
