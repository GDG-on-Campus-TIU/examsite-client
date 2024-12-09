<template>
  <div class="flex flex-col items-center justify-center h-full space-y-8">
    <!-- Attempted Exams Section -->
    <!-- <div class="w-full">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Attempted Exams</CardTitle>
          <CardDescription> Exams you have already attempted. </CardDescription>
        </CardHeader>

        <CardContent>
          <ul class="list-disc pl-5 text-muted-foreground">
            <li>Math Test - Score: 18/20</li>
            <li>Science Quiz - Score: 15/20</li>
            <li>History Exam - Score: 12/20</li>
          </ul>
        </CardContent>

        <CardFooter class="flex justify-end">
          Placeholder for future actions
        </CardFooter>
      </Card>
    </div> -->

    <!-- Upcoming Exams Section -->
    <div class="w-full">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">SOF GenAI Exam - 1</CardTitle>
          <CardDescription> Full Marks: 20 </CardDescription>
        </CardHeader>

        <CardContent>
          <p>Test your knowledge and skills in this internal examination</p>

          <Card class="mt-5 bg-red-500">
            <CardHeader class="flex flex-row end-1">
              <p>
                <Icon name="mdi:information" class="mr-2 w-5 h-5" />
              </p>
              Note that switching tabs would automatically submit the exam
            </CardHeader>
          </Card>
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
  </div>
</template>

<script setup>
const attemptQuiz = () => {
  console.log("Attempt Quiz button clicked");
};
</script>
