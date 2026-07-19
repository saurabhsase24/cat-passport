# Engineering Handbook

---

# Document Information

Document Name: Engineering Handbook

Project: Cat Passport

Version: 1.0

Owner: Saurabh Sase

Status: Approved

Last Updated: July 2026

---

# Purpose

This handbook defines the engineering standards for Cat Passport.

Every developer, AI assistant, contributor or future team member must follow these guidelines.

The objective is to keep the project clean, scalable, maintainable and enjoyable to work on.

---

# Project Philosophy

Cat Passport is being built like a professional startup product.

We optimize for:

• Simplicity

• Readability

• Reusability

• Scalability

• Maintainability

Every decision should make future development easier.

---

# Development Principles

## Rule 1

Always build reusable components.

Never duplicate UI.

Example

Correct

Button component reused everywhere.

Incorrect

Creating five different button designs.

---

## Rule 2

Mobile First.

Every screen must be designed for smartphones first.

Desktop adapts from mobile.

---

## Rule 3

Components before Pages.

Never start by building an entire page.

Instead build the reusable components that make up the page.

---

## Rule 4

Simple beats clever.

Readable code is better than complicated code.

Future developers should immediately understand the code.

---

## Rule 5

If unsure, choose consistency.

Consistency is more important than perfection.

---

# Folder Structure

The project follows this structure.

```text
cat-passport/

app/

components/

hooks/

lib/

services/

types/

public/

project-docs/

branding/

research/

ai-prompts/
```

Every new file should belong in one clearly defined location.

---

# Component Structure

Components should be grouped by feature.

Example

```text
components/

ui/

Button.tsx

Card.tsx

Avatar.tsx

Chip.tsx

home/

Hero.tsx

SearchBar.tsx

TrendingCats.tsx

passport/

PassportCard.tsx

Gallery.tsx

Timeline.tsx

map/

MapView.tsx

CatPin.tsx

navigation/

BottomNavigation.tsx
```

---

# Naming Conventions

Components

Use PascalCase.

Example

PassportCard.tsx

HeroSection.tsx

BottomNavigation.tsx

Never

newCard.tsx

cardFinal.tsx

homepage2.tsx

---

Variables

camelCase

Example

catLocation

passportNumber

lastSeen

---

Constants

UPPER_CASE

Example

MAX_PHOTO_UPLOAD

DEFAULT_MAP_ZOOM

---

Folders

lowercase

Example

components

passport

navigation

---

# File Naming

Good

PassportCard.tsx

MapView.tsx

HeroSection.tsx

Bad

passport.tsx

card_new.tsx

test2.tsx

---

# React Guidelines

Prefer

Functional Components

React Hooks

TypeScript interfaces

Avoid

Class Components

Inline styling

Duplicate code

---

# Props

Components should receive only the data they need.

Good

```tsx
<PassportCard cat={cat} />
```

Avoid

```tsx
<PassportCard
name=""
photo=""
location=""
...
30 props
/>
```

Create interfaces whenever possible.

---

# Styling

Tailwind CSS only.

Avoid custom CSS unless absolutely necessary.

Use reusable utility classes.

No inline CSS.

---

# Colors

Colors must come from the Design System.

Never invent random colors inside components.

---

# Icons

Use one icon library throughout the project.

Recommended:

Lucide React

Do not mix multiple icon libraries.

---

# Images

Optimize images.

Lazy load where appropriate.

Do not upload unnecessarily large files.

---

# Accessibility

Every feature should be usable by everyone.

Requirements

Large touch targets

Readable text

Semantic HTML

Proper button labels

Keyboard accessibility where appropriate

Color should never be the only indicator.

---

# Performance

Prefer native browser features.

Minimize dependencies.

Lazy load heavy components.

Optimize images.

Avoid unnecessary re-renders.

---

# Security

Never commit

API Keys

Passwords

Secrets

Tokens

Use environment variables.

Never expose Supabase keys unnecessarily.

---

# Git Workflow

Always begin development with

```bash
git status
```

Check current branch.

Review uncommitted changes.

Commit frequently.

Push regularly.

---

# Commit Messages

Format

type(scope): description

Examples

feat(passport): add Passport card

fix(map): correct pin placement

docs(prd): update roadmap

style(home): improve hero spacing

refactor(search): simplify component

---

# Branch Strategy

Version 1

main

Future

main

develop

feature/homepage

feature/map

feature/passport

bugfix/search

---

# AI Workflow

ChatGPT

Responsibilities

Product Management

Architecture

Teaching

Engineering Review

Database Design

Security Review

Claude

Responsibilities

UI Development

Component Implementation

Frontend Coding

Refactoring

Both AI systems should complement each other.

Never rely on only one AI.

---

# Before Writing Code

Always ask

Does this already exist?

Can it be reused?

Is there a simpler solution?

Does this follow the Design System?

---

# Before Installing Packages

Every new dependency must answer

Why is it needed?

Can native React solve this?

Can Next.js solve this?

Smaller projects are easier to maintain.

---

# Before Every Commit

Checklist

✓ Application builds

✓ No obvious errors

✓ Mobile layout works

✓ No unused files

✓ No console errors

✓ Code reviewed

✓ Meaningful commit message

---

# Before Every Pull Request (Future)

Code Review Checklist

Readable?

Reusable?

Accessible?

Responsive?

Typed?

Consistent?

Documented?

---

# Testing

Every completed feature should be tested.

Desktop

Android

iPhone

Small screens

Large screens

Landscape

Portrait

---

# Documentation

Major architectural decisions should be recorded.

Never rely on memory.

Update documentation whenever the product changes significantly.

---

# Decision Making

When making technical decisions

Priority

1. User Experience

2. Simplicity

3. Performance

4. Scalability

5. Developer Convenience

---

# Cat Passport Development Rule

Never add a feature simply because it is interesting.

Every feature must support the core product loop.

Discover

↓

Visit

↓

Check In

↓

Share

↓

Return

If a feature does not strengthen this loop, it belongs in Future Ideas instead of Version 1.

---

# Definition of Done

A feature is considered complete only if

✓ Works correctly

✓ Mobile responsive

✓ Accessible

✓ Matches Design System

✓ Reviewed

✓ Committed to Git

✓ Pushed to GitHub

✓ Documented if necessary

---

# Long-Term Vision

Cat Passport should be engineered so that it can grow from a personal project into a production-ready platform without requiring major rewrites.

Every decision made today should reduce complexity tomorrow.