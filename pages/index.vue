<template>
  <div class="flex items-center justify-center h-full">
    <Card class="w-full max-w-md">
      <CardHeader>
        <!-- Title -->
        <CardTitle class="text-2xl">SOF GenAI Exam - 1 </CardTitle>

        <!-- Subtitle -->
        <CardDescription>Marks: 20</CardDescription>
      </CardHeader>

      <CardContent>
        <p class="text-muted-foreground">
          Test your knowledge and skills in this internal examination.
        </p>
      </CardContent>

      <CardFooter class="flex justify-end">
        <!-- Button -->
        <Button variant="link" @click="attemptQuiz">
          <nuxt-link to="/exam">Attempt Quiz</nuxt-link>
          <Icon name="mdi:arrow-right" />
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
const token = "hi";

const attemptQuiz = () => {
  console.log("Attempt Quiz button clicked");
};
</script>
