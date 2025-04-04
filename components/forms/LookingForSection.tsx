import React from "react";
import { Controller } from "react-hook-form";
import { LookingFor, LookingForLabels } from "@/types/enums/LookingForEnum";

import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";

import { ChevronDownIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

const LookingForSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Looking For</Heading>

    <Controller
      control={control}
      name="lookingFor"
      render={({ field: { onChange, value } }) => (
        <Select selectedValue={value} onValueChange={onChange}>
          <SelectTrigger variant="outline" size="md" className="w-full h-12">
            <SelectInput
              placeholder="Select profile type"
              value={value ? LookingForLabels[value as LookingFor] : undefined}
            />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {Object.entries(LookingForLabels).map(([key, label]) => (
                <SelectItem key={key} value={key} label={label} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      )}
    />

    {errors.lookingFor && (
      <Text className="text-error-500">{errors.lookingFor.message}</Text>
    )}
  </VStack>
);

export default LookingForSection;
