<script lang="ts" setup>
import { ref } from "vue";

const questions = await $fetch("/api/questions");
const router = useRouter();

// Array to store selected choices for each question
const selectedChoices = ref<{ questionId: string; choiceIndex: number }[]>([]);

// Function to handle the change when a radio button is clicked
const handleChoiceChange = (questionId: string, choiceIndex: number) => {
  // Check if the question already has a selection
  const existingChoice = selectedChoices.value.find(
    (item) => item.questionId === questionId
  );

  if (existingChoice) {
    // Update the existing choice
    existingChoice.choiceIndex = choiceIndex;
  } else {
    // Add a new choice
    selectedChoices.value.push({
      questionId: questionId,
      choiceIndex: choiceIndex,
    });
  }
};

onMounted(async () => {
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "hidden") {
      const token = useCookie("token").value;

      await $fetch("/api/questions/submit", {
        method: "POST",
        body: selectedChoices.value,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/");
    }
  });
});
</script>

<template>
  <Form>
    <div v-for="(question, index) in questions" :key="question.examId">
      <FormItem>
        <Card class="mb-4">
          <CardHeader>
            <CardTitle class="text-2xl">{{
              `${index + 1}. ${question.question}`
            }}</CardTitle>
          </CardHeader>
          <CardContent>
            <!-- RadioGroup for choices of each question -->
            <RadioGroup :name="`question-${index}`">
              <div
                v-for="choice in question.choices"
                :key="choice.index"
                class="flex items-center space-x-2"
              >
                <RadioGroupItem
                  :id="choice.index.toString()"
                  :value="choice.index.toString()"
                  @click="handleChoiceChange(question._id, choice.index)"
                />
                <Label>
                  {{ choice.choice }}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </FormItem>
    </div>

    <!-- Submit Button -->
    <Button> Submit Answers </Button>
  </Form>
</template>
