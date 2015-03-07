foo = ["i", "love", "to", "code"]

foo.map { |word| word.upcase }
# => ["I", "LOVE", "TO", "CODE"]

foo.map(&:upcase)
# => ["I", "LOVE", "TO", "CODE"]


upper = Proc.new { |word| word.upcase}
["i", "love", "to", "code"].map(&upper)
# => ["I", "LOVE", "TO", "CODE"]
["got", "asked", "out", "on", "april", "1st"].map(&upper)
# => ["GOT", "ASKED", "OUT", "ON", "APRIL", "1ST"]
["my", "armpit", "is", "a", "taco"].map(&upper)
# => ["MY", "ARMPIT", "IS", "A", "TACO"]


class Symbol
  def to_proc
    Proc.new { |obj, *args| obj.send(self, *args) }
  end
end

:upcase.to_proc
# => { |word| word.send(:upcase)}


[3, 2, 7, 5].inject { |sum, x| sum + x}
# => 17

[3, 2, 7, 5].inject(&:+)
# is equivalent to
[3, 2, 7, 5].inject { |sum, x| sum.send(:+, x)}


letter = "o"
foo.select { |word| word.include?(letter)}
# => ["love", "to", "code"]

#if only THIS could be done!
#foo.select(&:include?)  with letter passed as argument

#could this be possible?
#foo.select(&[:include?, letter])


Array.respond_to?(:to_proc)
# => false

class Array
  def to_proc
    method = self.shift
    args = self
    Proc.new { |x, *others| x.send(method, *(others + args))}
  end
end


stuff = [3, "corn", 6, 34, "gorilla", :four]
stuff.select(&[:is_a?, Integer])
# => [3, 6, 34]
stuff.select(&[:is_a?, String])
# => ["corn", "gorilla"]

letter = "t"
i_want_pets = ["I", "want", 3, "pets", "but", "only", "have", 2]
i_want_pets.map(&:to_s).select(&[:include?, letter])
# => ["want", "pets", "but"]

group_1 = [4.1, 5.5, 3.2, 3.3, 6.1, 3.9, 4.7]
group_1.reject(&[:<, 4])
# => [4.1, 5.5, 6.1, 4.7]





["laptop", "headphones", "pillow", "microwave"].each { |x|
  puts "I can't live without my #{x}!"
}
# I can't live without my laptop!
# I can't live without my headphones!
# I can't live without my pillow!
# I can't live without my microwave!


foo = Enumerator.new { |y|
  y.yield(1)
  y.yield(2)
  y.yield(3)
}

foo.map { |x| x }
# => [1, 2, 3]


bar = [1, 2, 3].each
# => { |y|
#   y.yield(1)
#   y.yield(2)
#   y.yield(3)
# }


arr = [4, 4, 0, 8, 0, 4, 1, 2, 3, 4, 5, 6, 7, 9, 0, 1]
# do something to arr
# => [8, 4, 0, 8, 0, 4, 2, 2, 6, 4, 10, 6, 14, 9, 0, 1]

for i in (0...arr.length)
  if i % 2 == 0
    arr[i] *= 2
  end
end
arr => [8, 4, 0, 8, 0, 4, 2, 2, 6, 4, 10, 6, 14, 9, 0, 1]


arr.each_with_index.map{ |x,i| x.*((i+1)%2+1) }
# => [8, 4, 0, 8, 0, 4, 2, 2, 6, 4, 10, 6, 14, 9, 0, 1]


